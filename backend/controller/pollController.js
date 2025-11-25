// controllers/pollController.js
const Poll = require("../models/PollSchema");
const User = require("../models/userSchema");

exports.createPoll = async (req, res) => {
  try {
    const poll = new Poll({
      ...req.body,
      createdBy: req.user.id
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ isActive: true })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const { pollId, questionIndex, selectedOptions } = req.body;
    const poll = await Poll.findById(pollId);
    
    if (!poll || !poll.isActive) {
      return res.status(404).json({ error: "Poll not found or inactive" });
    }

    // Update votes
    selectedOptions.forEach(optionIndex => {
      poll.questions[questionIndex].options[optionIndex].votes += 1;
    });

    await poll.save();
    res.json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};