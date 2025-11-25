// controllers/feedbackController.js
const Feedback = require("../models/FeedbackSchema");

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback({
      ...req.body,
      submittedBy: req.user.id
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    
    // Regular users can only see their own feedback
    if (req.user.role !== "admin") {
      query.submittedBy = req.user.id;
    }

    const feedback = await Feedback.find(query)
      .populate("submittedBy", "name email")
      .populate("respondedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Feedback.countDocuments(query);
    
    res.json({
      feedback,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFeedbackStatus = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    feedback.status = req.body.status;
    feedback.adminResponse = req.body.adminResponse;
    feedback.respondedBy = req.user.id;
    feedback.respondedAt = new Date();

    await feedback.save();
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};