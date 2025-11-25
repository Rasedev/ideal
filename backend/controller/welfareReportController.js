// controllers/welfareReportController.js
const WelfareReport = require("../models/WelfareReportSchema");

exports.createReport = async (req, res) => {
  try {
    const report = new WelfareReport({
      ...req.body,
      generatedBy: req.user.id
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { type, isPublished, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (type) query.type = type;
    if (isPublished !== undefined) query.isPublished = isPublished;

    const reports = await WelfareReport.find(query)
      .populate("generatedBy", "name email")
      .populate("initiativesCovered.initiative", "title category")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WelfareReport.countDocuments(query);
    
    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.publishReport = async (req, res) => {
  try {
    const report = await WelfareReport.findByIdAndUpdate(
      req.params.id,
      { 
        isPublished: true,
        publishedAt: new Date()
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};