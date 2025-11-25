// controllers/welfareInitiativeController.js
const WelfareInitiative = require("../models/WelfareInitiative");

exports.createInitiative = async (req, res) => {
  try {
    const initiative = new WelfareInitiative({
      ...req.body,
      createdBy: req.user.id
    });
    await initiative.save();
    res.status(201).json(initiative);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getInitiatives = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;

    const initiatives = await WelfareInitiative.find(query)
      .populate("createdBy", "name email")
      .populate("coordinators.user", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WelfareInitiative.countDocuments(query);
    
    res.json({
      initiatives,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateInitiative = async (req, res) => {
  try {
    const initiative = await WelfareInitiative.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate("createdBy", "name email")
     .populate("coordinators.user", "name email");

    if (!initiative) {
      return res.status(404).json({ error: "Initiative not found" });
    }

    res.json(initiative);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};