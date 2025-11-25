// controllers/communityController.js
const Announcement = require("../models/announcementSchema");
const Discussion = require("../models/DiscussionSchema");
const Poll = require("../models/PollSchema");
const Feedback = require("../models/FeedbackSchema");
const User = require("../models/userSchema");
const mongoose = require("mongoose");

// Dashboard Statistics
async function getCommunityStatsController(req, res) {
  try {
    const userId = req.user.id;

    const [
      totalAnnouncements,
      unreadAnnouncements,
      totalDiscussions,
      activePolls,
      pendingFeedback,
      totalMembers
    ] = await Promise.all([
      Announcement.countDocuments(),
      Announcement.countDocuments({
        recipients: {
          $elemMatch: {
            user: mongoose.Types.ObjectId(userId),
            read: false
          }
        }
      }),
      Discussion.countDocuments(),
      Poll.countDocuments({ isActive: true }),
      Feedback.countDocuments({
        $or: [{ status: "Pending" }, { status: "Under Review" }]
      }),
      User.countDocuments({ isActive: true })
    ]);

    const recentActivities = await getRecentActivities();

    const popularDiscussions = await Discussion.find()
      .populate("author", "name")
      .sort({ views: -1, replies: -1 })
      .limit(5)
      .select("title views replies createdAt");

    res.json({
      stats: {
        totalAnnouncements,
        unreadAnnouncements,
        totalDiscussions,
        activePolls,
        pendingFeedback,
        totalMembers
      },
      recentActivities,
      popularDiscussions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get user-specific community feed
async function getCommunityFeed(req, res) {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);

    const announcementQuery = {
      $or: [
        { recipientType: "All" },
        { recipientType: req.user.role },
        { "recipients.user": mongoose.Types.ObjectId(userId) }
      ]
    };

    const [announcements, totalAnnouncements] = await Promise.all([
      Announcement.find(announcementQuery)
        .populate("sender", "name email")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .select("title message priority createdAt recipients"),
      Announcement.countDocuments(announcementQuery)
    ]);

    // Mark announcements as read if viewed in feed
    await Promise.all(
      announcements.map(async (announcement) => {
        // ensure recipients is array
        if (!Array.isArray(announcement.recipients)) announcement.recipients = [];

        const recipientIndex = announcement.recipients.findIndex((r) =>
          r.user && r.user.toString() === userId
        );

        if (recipientIndex === -1) {
          announcement.recipients.push({
            user: mongoose.Types.ObjectId(userId),
            read: true,
            readAt: new Date()
          });
        } else if (!announcement.recipients[recipientIndex].read) {
          announcement.recipients[recipientIndex].read = true;
          announcement.recipients[recipientIndex].readAt = new Date();
        }

        await announcement.save();
      })
    );

    const discussions = await Discussion.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category replies views createdAt");

    const polls = await Poll.find({ isActive: true })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title questions endDate totalVotes");

    res.json({
      announcements,
      discussions,
      polls,
      currentPage: page,
      totalPages: Math.ceil(totalAnnouncements / limit),
      totalAnnouncements
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Search across community content
async function searchCommunity(req, res) {
  try {
    const { query, type, category } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const searchRegex = new RegExp(query, "i");

    // Generic search fields. Some models won't have all of these fields; that's OK in Mongo.
    const searchQuery = {
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { message: searchRegex },
        { content: searchRegex }
      ]
    };

    if (category) {
      searchQuery.category = category;
    }

    let results = [];
    let total = 0;

    switch (type) {
      case "announcements": {
        [results, total] = await Promise.all([
          Announcement.find(searchQuery)
            .populate("sender", "name")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit),
          Announcement.countDocuments(searchQuery)
        ]);
        break;
      }

      case "discussions": {
        [results, total] = await Promise.all([
          Discussion.find(searchQuery)
            .populate("author", "name")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit),
          Discussion.countDocuments(searchQuery)
        ]);
        break;
      }

      case "polls": {
        [results, total] = await Promise.all([
          Poll.find(searchQuery)
            .populate("createdBy", "name")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit),
          Poll.countDocuments(searchQuery)
        ]);
        break;
      }

      case "feedback": {
        [results, total] = await Promise.all([
          Feedback.find(searchQuery)
            .populate("submittedBy", "name")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit),
          Feedback.countDocuments(searchQuery)
        ]);
        break;
      }

      default: {
        const [announcements, discussions, polls, feedback] = await Promise.all([
          Announcement.find(searchQuery)
            .populate("sender", "name")
            .limit(5)
            .select("title message createdAt type"),
          Discussion.find(searchQuery)
            .populate("author", "name")
            .limit(5)
            .select("title content category createdAt"),
          Poll.find(searchQuery)
            .populate("createdBy", "name")
            .limit(5)
            .select("title description createdAt"),
          Feedback.find(searchQuery)
            .populate("submittedBy", "name")
            .limit(5)
            .select("title message category createdAt")
        ]);

        results = { announcements, discussions, polls, feedback };
        total = announcements.length + discussions.length + polls.length + feedback.length;
        break;
      }
    }

    res.json({
      results,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      query,
      type: type || "all"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get user engagement metrics
async function getUserEngagement(req, res) {
  try {
    const userId = req.user.id;
    const period = req.query.period || "30d"; // 7d, 30d, 90d, 1y
    const dateRange = getDateRange(period);

    const [userDiscussions, userReplies, userPolls, userFeedback] = await Promise.all([
      Discussion.countDocuments({
        author: mongoose.Types.ObjectId(userId),
        createdAt: { $gte: dateRange.start }
      }),
      Discussion.countDocuments({
        "replies.author": mongoose.Types.ObjectId(userId),
        "replies.createdAt": { $gte: dateRange.start }
      }),
      Poll.countDocuments({
        createdBy: mongoose.Types.ObjectId(userId),
        createdAt: { $gte: dateRange.start }
      }),
      Feedback.countDocuments({
        submittedBy: mongoose.Types.ObjectId(userId),
        createdAt: { $gte: dateRange.start }
      })
    ]);

    const [totalDiscussions, totalRepliesAgg, totalPolls, totalFeedback, activeUsers] = await Promise.all([
      Discussion.countDocuments({ createdAt: { $gte: dateRange.start } }),
      Discussion.aggregate([
        { $match: { createdAt: { $gte: dateRange.start } } },
        { $project: { replyCount: { $size: { $ifNull: ["$replies", []] } } } },
        { $group: { _id: null, total: { $sum: "$replyCount" } } }
      ]),
      Poll.countDocuments({ createdAt: { $gte: dateRange.start } }),
      Feedback.countDocuments({ createdAt: { $gte: dateRange.start } }),
      Discussion.distinct("author", { createdAt: { $gte: dateRange.start } })
    ]);

    const totalReplies = totalRepliesAgg[0]?.total || 0;
    const userRank = await calculateUserRank(userId, period);

    res.json({
      userEngagement: {
        discussions: userDiscussions,
        replies: userReplies,
        polls: userPolls,
        feedback: userFeedback,
        totalContributions: userDiscussions + userReplies + userPolls + userFeedback
      },
      communityEngagement: {
        totalDiscussions,
        totalReplies,
        totalPolls,
        totalFeedback,
        activeUsers: Array.isArray(activeUsers) ? activeUsers.length : 0
      },
      userRank,
      period
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get community members list with roles
async function getCommunityMembers(req, res) {
  try {
    const role = req.query.role;
    const search = req.query.search;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 200);

    const query = { isActive: true };
    if (role && role !== "all") query.role = role;
    if (search) {
      query.$or = [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }];
    }

    const [members, total] = await Promise.all([
      User.find(query)
        .select("name email role avatar joinDate lastActive")
        .sort({ name: 1 })
        .limit(limit)
        .skip((page - 1) * limit),
      User.countDocuments(query)
    ]);

    const roleStats = await User.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    res.json({
      members,
      total,
      roleStats,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export community data (admin / hr)
async function exportCommunityData(req, res) {
  try {
    const { type, format = "json" } = req.query;

    if (!["admin", "hr"].includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    let data;
    const timestamp = new Date().toISOString().split("T")[0];

    switch (type) {
      case "announcements":
        data = await Announcement.find().populate("sender", "name email").sort({ createdAt: -1 });
        break;
      case "discussions":
        data = await Discussion.find().populate("author", "name email").sort({ createdAt: -1 });
        break;
      case "polls":
        data = await Poll.find().populate("createdBy", "name email").sort({ createdAt: -1 });
        break;
      case "feedback":
        data = await Feedback.find()
          .populate("submittedBy", "name email")
          .populate("respondedBy", "name email")
          .sort({ createdAt: -1 });
        break;
      case "members":
        data = await User.find({ isActive: true })
          .select("name email role joinDate lastActive")
          .sort({ name: 1 });
        break;
      default:
        return res.status(400).json({ error: "Invalid export type" });
    }

    if (format === "csv") {
      const csv = convertToCSV(data);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=${type}-${timestamp}.csv`);
      return res.send(csv);
    }

    res.json({
      type,
      exportedAt: new Date(),
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Helper function to get recent activities
async function getRecentActivities() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [recentAnnouncements, recentDiscussions, recentPolls] = await Promise.all([
    Announcement.find({ createdAt: { $gte: oneWeekAgo } })
      .populate("sender", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt sender"),
    Discussion.find({ createdAt: { $gte: oneWeekAgo } })
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title category createdAt author"),
    Poll.find({ createdAt: { $gte: oneWeekAgo } })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt createdBy")
  ]);

  return {
    announcements: recentAnnouncements,
    discussions: recentDiscussions,
    polls: recentPolls
  };
}

// Helper function to calculate date range
function getDateRange(period) {
  const now = new Date();
  const start = new Date();

  switch (period) {
    case "7d":
      start.setDate(now.getDate() - 7);
      break;
    case "30d":
      start.setDate(now.getDate() - 30);
      break;
    case "90d":
      start.setDate(now.getDate() - 90);
      break;
    case "1y":
      start.setFullYear(now.getFullYear() - 1);
      break;
    default:
      start.setDate(now.getDate() - 30);
  }

  return { start, end: now };
}

// Helper function to calculate user rank
async function calculateUserRank(userId, period) {
  const dateRange = getDateRange(period);

  const topContributors = await Discussion.aggregate([
    { $match: { createdAt: { $gte: dateRange.start } } },
    {
      $facet: {
        discussionCreators: [
          {
            $group: {
              _id: "$author",
              discussionCount: { $sum: 1 },
              totalViews: { $sum: { $ifNull: ["$views", 0] } },
              totalReplies: { $sum: { $size: { $ifNull: ["$replies", []] } } }
            }
          }
        ],
        replyAuthors: [
          { $unwind: { path: "$replies", preserveNullAndEmptyArrays: false } },
          { $match: { "replies.createdAt": { $gte: dateRange.start } } },
          {
            $group: {
              _id: "$replies.author",
              replyCount: { $sum: 1 },
              totalLikes: { $sum: { $size: { $ifNull: ["$replies.likes", []] } } }
            }
          }
        ]
      }
    }
  ]);

  const userScores = new Map();

  (topContributors[0].discussionCreators || []).forEach((creator) => {
    const score = creator.discussionCount * 10 + creator.totalViews * 0.1 + creator.totalReplies * 2;
    userScores.set(creator._id.toString(), (userScores.get(creator._id.toString()) || 0) + score);
  });

  (topContributors[0].replyAuthors || []).forEach((replier) => {
    const score = replier.replyCount * 5 + replier.totalLikes * 1;
    userScores.set(replier._id.toString(), (userScores.get(replier._id.toString()) || 0) + score);
  });

  const rankedUsers = Array.from(userScores.entries())
    .map(([uid, score]) => ({ userId: uid, score }))
    .sort((a, b) => b.score - a.score);

  const userIndex = rankedUsers.findIndex((u) => u.userId === userId.toString());

  return userIndex !== -1
    ? { rank: userIndex + 1, score: rankedUsers[userIndex].score, totalUsers: rankedUsers.length }
    : { rank: rankedUsers.length + 1, score: 0, totalUsers: rankedUsers.length };
}

// Helper function to convert data to CSV
function convertToCSV(data) {
  if (!data || data.length === 0) return "";

  // Normalize to plain objects if mongoose documents
  const rows = data.map((d) => (d._doc ? d._doc : d));
  const headers = Object.keys(rows[0]).join(",");

  const csvRows = rows.map((row) => {
    const values = Object.values(row).map((value) => {
      if (value instanceof Date) return value.toISOString();
      if (Array.isArray(value) || typeof value === "object") {
        // stringify objects/arrays
        try {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        } catch {
          return "";
        }
      }
      if (typeof value === "string" && value.includes(",")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    return values.join(",");
  });

  return [headers, ...csvRows].join("\n");
}

module.exports = {
  getCommunityStatsController,
  getCommunityFeed,
  searchCommunity,
  getUserEngagement,
  getCommunityMembers,
  exportCommunityData
};
