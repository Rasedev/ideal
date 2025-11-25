// controllers/donationController.js
const Donation = require("../models/DonationSchema");

exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      donor: req.user.id
    });
    await donation.save();
    
    await donation.populate("donor", "name email");
    await donation.populate("initiative", "title");
    
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (type) query.type = type;

    const donations = await Donation.find(query)
      .populate("donor", "name email")
      .populate("initiative", "title")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Donation.countDocuments(query);
    
    res.json({
      donations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalDonations: { $sum: 1 },
          averageDonation: { $avg: "$amount" }
        }
      }
    ]);

    const monthlyStats = await Donation.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          amount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 }
    ]);

    res.json({
      overall: stats[0] || { totalAmount: 0, totalDonations: 0, averageDonation: 0 },
      monthly: monthlyStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};