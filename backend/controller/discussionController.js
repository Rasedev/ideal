// controllers/discussionController.js
const Discussion = require("../models/DiscussionSchema");

exports.createDiscussion = async (req, res) => {
  try {
    const discussion = new Discussion({
      ...req.body,
      author: req.user.id
    });
    await discussion.save();
    await discussion.populate("author", "name email");
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDiscussions = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    
    const discussions = await Discussion.find(query)
      .populate("author", "name email")
      .populate("replies.author", "name email")
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Discussion.countDocuments(query);
    
    res.json({
      discussions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    discussion.replies.push({
      ...req.body,
      author: req.user.id
    });

    await discussion.save();
    await discussion.populate("replies.author", "name email");
    res.json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};