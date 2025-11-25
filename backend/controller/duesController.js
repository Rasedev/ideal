



const Dues = require('../models/DuesSchema');
const User = require('../models/userSchema');

// @desc    Create new dues
// @route   POST /api/v1/dues
// @access  Private (Admin, FinanceSecretary)
const createDues = async (req, res) => {
  try {
    const {
      memberId,
      title,
      description,
      amount,
      dueType,
      dueDate,
      gracePeriod,
      notes
    } = req.body;

    // Validation
    if (!memberId || !title || !amount || !dueType || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: memberId, title, amount, dueType, dueDate'
      });
    }

    // Check if member exists
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Create dues
    const dues = await Dues.create({
      member: memberId,
      title,
      description,
      amount: parseFloat(amount),
      dueType,
      dueDate: new Date(dueDate),
      gracePeriod: gracePeriod || 7,
      notes,
      createdBy: req.user._id
    });

    await dues.populate('member', 'firstName lastName email phone membershipId');

    res.status(201).json({
      success: true,
      message: 'Dues created successfully',
      dues
    });

  } catch (error) {
    console.error('Create dues error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating dues',
      error: error.message
    });
  }
};

// @desc    Get all dues with filters
// @route   GET /api/v1/dues
// @access  Private (Admin, FinanceSecretary)
const getAllDues = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      dueType,
      memberId,
      startDate,
      endDate,
      overdueOnly
    } = req.query;

    // Build filter
    const filter = {};
    
    if (status) filter.status = status;
    if (dueType) filter.dueType = dueType;
    if (memberId) filter.member = memberId;
    
    // Date range filter
    if (startDate || endDate) {
      filter.dueDate = {};
      if (startDate) filter.dueDate.$gte = new Date(startDate);
      if (endDate) filter.dueDate.$lte = new Date(endDate);
    }
    
    // Overdue filter
    if (overdueOnly === 'true') {
      filter.status = 'pending';
      filter.dueDate = { $lt: new Date() };
    }

    // Execute query
    const dues = await Dues.find(filter)
      .populate('member', 'firstName lastName email phone membershipId')
      .populate('createdBy', 'firstName lastName')
      .populate('verifiedBy', 'firstName lastName')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Dues.countDocuments(filter);

    res.json({
      success: true,
      dues,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalDues: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get dues error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dues',
      error: error.message
    });
  }
};

// @desc    Get member's dues
// @route   GET /api/v1/dues/my-dues
// @access  Private (Member)
const getMyDues = async (req, res) => {
  try {
    const { page = 1, limit = 12, status } = req.query;

    const filter = { member: req.user._id };
    if (status) filter.status = status;

    const dues = await Dues.find(filter)
      .populate('createdBy', 'firstName lastName')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Dues.countDocuments(filter);

    // Calculate statistics
    const totalPending = await Dues.countDocuments({
      ...filter,
      status: 'pending'
    });
    const totalOverdue = await Dues.countDocuments({
      ...filter,
      status: 'pending',
      dueDate: { $lt: new Date() }
    });
    const totalAmountPending = await Dues.aggregate([
      { $match: { ...filter, status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      dues,
      statistics: {
        total,
        totalPending,
        totalOverdue,
        totalAmountPending: totalAmountPending[0]?.total || 0
      },
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalDues: total
      }
    });

  } catch (error) {
    console.error('Get my dues error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dues',
      error: error.message
    });
  }
};

// @desc    Update dues status
// @route   PATCH /api/v1/dues/:duesId/status
// @access  Private (Admin, FinanceSecretary)
const updateDuesStatus = async (req, res) => {
  try {
    const { duesId } = req.params;
    const { status, paidAmount, paymentMethod, transactionId, notes } = req.body;

    const dues = await Dues.findById(duesId);
    if (!dues) {
      return res.status(404).json({
        success: false,
        message: 'Dues not found'
      });
    }

    const updateData = {};

    if (status) {
      updateData.status = status;
      
      if (status === 'paid') {
        updateData.paidAmount = dues.amount;
        updateData.paidAt = new Date();
        updateData.paymentMethod = paymentMethod;
        updateData.transactionId = transactionId;
        updateData.verifiedBy = req.user._id;
        updateData.verifiedAt = new Date();
      } else if (status === 'partially_paid' && paidAmount) {
        updateData.paidAmount = parseFloat(paidAmount);
        updateData.status = paidAmount >= dues.amount ? 'paid' : 'partially_paid';
      }
    }

    if (notes) {
      updateData.notes = notes;
    }

    const updatedDues = await Dues.findByIdAndUpdate(
      duesId,
      updateData,
      { new: true, runValidators: true }
    ).populate('member', 'firstName lastName email phone')
     .populate('verifiedBy', 'firstName lastName');

    res.json({
      success: true,
      message: 'Dues updated successfully',
      dues: updatedDues
    });

  } catch (error) {
    console.error('Update dues error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating dues',
      error: error.message
    });
  }
};

// @desc    Send due reminder
// @route   POST /api/v1/dues/:duesId/reminder
// @access  Private (Admin, FinanceSecretary)
const sendDueReminder = async (req, res) => {
  try {
    const { duesId } = req.params;
    const { reminderType, customMessage } = req.body;

    const dues = await Dues.findById(duesId).populate('member');
    if (!dues) {
      return res.status(404).json({
        success: false,
        message: 'Dues not found'
      });
    }

    // Update reminder count and dates
    dues.reminderCount += 1;
    dues.lastReminderSent = new Date();
    dues.nextReminderDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days later
    
    await dues.save();

    // Here you would integrate with your email/SMS service
    // For now, we'll just return success

    res.json({
      success: true,
      message: `Reminder sent successfully to ${dues.member.firstName} ${dues.member.lastName}`,
      reminderCount: dues.reminderCount
    });

  } catch (error) {
    console.error('Send reminder error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending reminder',
      error: error.message
    });
  }
};

// @desc    Get dues statistics
// @route   GET /api/v1/dues/stats
// @access  Private (Admin, FinanceSecretary)
const getDuesStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Total statistics
    const totalStats = await Dues.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalPaid: { $sum: '$paidAmount' }
        }
      }
    ]);

    // Monthly statistics for current year
    const monthlyStats = await Dues.aggregate([
      {
        $match: {
          dueDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$dueDate' },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalPaid: { $sum: '$paidAmount' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // Overdue statistics
    const overdueStats = await Dues.aggregate([
      {
        $match: {
          status: 'pending',
          dueDate: { $lt: new Date() }
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          avgDaysOverdue: { $avg: { $subtract: [new Date(), '$dueDate'] } }
        }
      }
    ]);

    // Due type statistics
    const dueTypeStats = await Dues.aggregate([
      {
        $group: {
          _id: '$dueType',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          totalPaid: { $sum: '$paidAmount' }
        }
      }
    ]);

    const stats = {
      total: totalStats.reduce((sum, stat) => sum + stat.count, 0),
      totalAmount: totalStats.reduce((sum, stat) => sum + stat.totalAmount, 0),
      totalPaid: totalStats.reduce((sum, stat) => sum + stat.totalPaid, 0),
      byStatus: totalStats.reduce((acc, stat) => {
        acc[stat._id] = stat;
        return acc;
      }, {}),
      monthly: monthlyStats,
      overdue: overdueStats[0] || { count: 0, totalAmount: 0, avgDaysOverdue: 0 },
      byDueType: dueTypeStats
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Dues stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dues statistics',
      error: error.message
    });
  }
};

// @desc    Delete dues
// @route   DELETE /api/v1/dues/:duesId
// @access  Private (Admin, FinanceSecretary)
const deleteDues = async (req, res) => {
  try {
    const { duesId } = req.params;

    const dues = await Dues.findByIdAndDelete(duesId);
    
    if (!dues) {
      return res.status(404).json({
        success: false,
        message: 'Dues not found'
      });
    }

    res.json({
      success: true,
      message: 'Dues deleted successfully'
    });

  } catch (error) {
    console.error('Delete dues error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting dues',
      error: error.message
    });
  }
};

module.exports = {
  createDues,
  getAllDues,
  getMyDues,
  updateDuesStatus,
  sendDueReminder,
  getDuesStats,
  deleteDues
};




