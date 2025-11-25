// routes/community.js
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/authMiddleware");

// controllers
const announcementController = require("../../controller/announcementController");
const discussionController = require("../../controller/discussionController");
const pollController = require("../../controller/pollController");
const feedbackController = require("../../controller/feedbackController");
const communityController = require("../../controller/communityController");

// Announcements
router.get("/announcements", announcementController.getUserAnnouncements);
router.post("/announcements", announcementController.createAnnouncement); // create may be role-restricted
router.patch("/announcements/:id/read", announcementController.markAsRead);

// Discussions
router.get("/discussions", discussionController.getDiscussions);
router.post("/discussions", discussionController.createDiscussion);
router.post("/discussions/:id/replies", discussionController.addReply);

// Polls
router.get("/polls", pollController.getPolls);
router.post("/polls", pollController.createPoll);
router.post("/polls/:id/vote", pollController.votePoll);

// Feedback
router.get("/feedback", feedbackController.getFeedback);
router.post("/feedback", feedbackController.submitFeedback);
router.patch("/feedback/:id", feedbackController.updateFeedbackStatus); // maybe restricted

// Community-wide (dashboard, feed, search, members, export, engagement)
router.get("/stats", communityController.getCommunityStatsController);
router.get("/feed", communityController.getCommunityFeed);
router.get("/search", communityController.searchCommunity);
router.get("/engagement", communityController.getUserEngagement);
router.get("/members", communityController.getCommunityMembers);
router.get("/export", communityController.exportCommunityData);

module.exports = router;
