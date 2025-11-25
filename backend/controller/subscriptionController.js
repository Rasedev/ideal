// controllers/subscriptionController.js
// const Subscription = require("../models/subscriptionSchema");
// const User = require("../models/userSchema");

// // Create monthly subscription
// const createSubscription = async (req, res) => {
//   try {
//     const { amount, paymentMethod, transactionId, month } = req.body;
    
//     // Validate required fields
//     if (!amount || !paymentMethod || !transactionId || !month) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required: amount, paymentMethod, transactionId, month"
//       });
//     }

//     // Check if subscription already exists for this month
//     const existingSubscription = await Subscription.findOne({
//       member: req.user._id,
//       month: month
//     });

//     if (existingSubscription) {
//       return res.status(400).json({
//         success: false,
//         message: "Subscription for this month already exists"
//       });
//     }

//     const subscription = new Subscription({
//       member: req.user._id,
//       amount,
//       paymentMethod,
//       transactionId,
//       month,
//       status: "Pending"
//     });

//     await subscription.save();
    
//     // Populate the response
//     const populatedSubscription = await Subscription.findById(subscription._id)
//       .populate("member", "firstName lastName email");

//     res.status(201).json({
//       success: true,
//       message: "Subscription payment submitted successfully",
//       subscription: populatedSubscription
//     });
//   } catch (error) {
//     console.error("Subscription creation error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating subscription",
//       error: error.message
//     });
//   }
// };

// // Verify subscription (Finance Secretary)
// const verifySubscription = async (req, res) => {
//   try {
//     const { subscriptionId } = req.params;
    
//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       { 
//         status: "Completed",
//         verifiedBy: req.user._id,
//         paidAt: new Date()
//       },
//       { new: true }
//     ).populate("member", "firstName lastName email")
//      .populate("verifiedBy", "firstName lastName");

//     if (!subscription) {
//       return res.status(404).json({
//         success: false,
//         message: "Subscription not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Subscription verified successfully",
//       subscription
//     });
//   } catch (error) {
//     console.error("Subscription verification error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error verifying subscription",
//       error: error.message
//     });
//   }
// };

// // Get payment statistics
// const getPaymentStats = async (req, res) => {
//   try {
//     const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    
//     const totalMembers = await User.countDocuments({ 
//       role: { $in: ["Member", "PlotOwner"] },
//       isActive: true 
//     });
    
//     const paidThisMonth = await Subscription.countDocuments({
//       month: currentMonth,
//       status: "Completed"
//     });
    
//     const pendingPayments = await Subscription.countDocuments({
//       status: "Pending"
//     });

//     const totalRevenue = await Subscription.aggregate([
//       { $match: { status: "Completed", month: currentMonth } },
//       { $group: { _id: null, total: { $sum: "$amount" } } }
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalMembers,
//         paidThisMonth,
//         pendingPayments,
//         totalRevenue: totalRevenue[0]?.total || 0,
//         paymentRate: totalMembers > 0 ? ((paidThisMonth / totalMembers) * 100).toFixed(1) : 0
//       }
//     });
//   } catch (error) {
//     console.error("Payment stats error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching payment stats",
//       error: error.message
//     });
//   }
// };

// // Get user's subscriptions
// const getMySubscriptions = async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find({ 
//       member: req.user._id 
//     })
//     .populate("verifiedBy", "firstName lastName")
//     .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       subscriptions
//     });
//   } catch (error) {
//     console.error("Get subscriptions error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching subscriptions",
//       error: error.message
//     });
//   }
// };

// // Get all subscriptions (Admin/Finance Secretary)
// const getAllSubscriptions = async (req, res) => {
//   try {
//     const { month, status, paymentMethod } = req.query;
    
//     const filter = {};
//     if (month) filter.month = month;
//     if (status) filter.status = status;
//     if (paymentMethod) filter.paymentMethod = paymentMethod;

//     const subscriptions = await Subscription.find(filter)
//       .populate("member", "firstName lastName email phone")
//       .populate("verifiedBy", "firstName lastName")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: subscriptions.length,
//       subscriptions
//     });
//   } catch (error) {
//     console.error("Get all subscriptions error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching subscriptions",
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   createSubscription,
//   verifySubscription,
//   getPaymentStats,
//   getMySubscriptions,
//   getAllSubscriptions
// };




// controllers/subscriptionController.js
const Subscription = require('../models/subscriptionSchema');
const PaymentSettings = require('../models/PaymentSettingsSchema');
const User = require('../models/userSchema');
const Notification = require('../models/Notification');

// Get all subscriptions with filters
const getSubscriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, month, year, memberId } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (month) filter.month = month;
    if (year) filter.year = year;
    if (memberId) filter.member = memberId;

    const subscriptions = await Subscription.find(filter)
      .populate('member', 'firstName lastName email phone membershipId image')
      .populate('verifiedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Subscription.countDocuments(filter);

    res.json({
      success: true,
      subscriptions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscriptions',
      error: error.message
    });
  }
};

// Submit payment (Member)
const submitPayment = async (req, res) => {
  try {
    const {
      month,
      year,
      paymentMethod,
      amount,
      transactionId,
      bankDetails,
      mobileBankingDetails,
      notes
    } = req.body;

    // Validate required fields
    if (!month || !year || !paymentMethod || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Month, year, payment method, and amount are required'
      });
    }

    // Check if subscription already exists
    const existingSubscription = await Subscription.findOne({
      member: req.user._id,
      month,
      year
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'Subscription for this month already exists'
      });
    }

    // Get due date from settings
    const settings = await PaymentSettings.findOne();
    const dueDate = new Date(`${year}-${month}-${settings.dueDateDay}`);

    const subscriptionData = {
      member: req.user._id,
      month,
      year,
      amount,
      paymentMethod,
      dueDate,
      status: 'pending',
      notes
    };

    // Add payment method specific details
    if (paymentMethod === 'bank' && bankDetails) {
      subscriptionData.bankDetails = bankDetails;
      subscriptionData.bankDetails.transactionId = transactionId;
    } else if (['bkash', 'nagad', 'rocket'].includes(paymentMethod) && mobileBankingDetails) {
      subscriptionData.mobileBankingDetails = {
        provider: paymentMethod,
        ...mobileBankingDetails
      };
    }

    // Handle file upload
    if (req.file) {
      subscriptionData.proofDocument = {
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
        uploadedAt: new Date()
      };
    }

    const subscription = new Subscription(subscriptionData);
    await subscription.save();

    // Send notification to finance team
    await sendPaymentNotification(subscription, req.user);

    const populatedSubscription = await Subscription.findById(subscription._id)
      .populate('member', 'firstName lastName email membershipId');

    res.status(201).json({
      success: true,
      message: 'Payment submitted successfully. Waiting for verification.',
      subscription: populatedSubscription
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting payment',
      error: error.message
    });
  }
};

// Verify payment (Finance Secretary)
const verifyPayment = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { status, notes } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    subscription.status = status;
    subscription.verifiedBy = req.user._id;
    subscription.verifiedAt = new Date();
    
    if (status === 'paid') {
      subscription.paidAt = new Date();
    }

    if (notes) {
      subscription.notes = notes;
    }

    await subscription.save();

    // Send notification to member
    await sendVerificationNotification(subscription, req.user);

    res.json({
      success: true,
      message: `Payment ${status} successfully`,
      subscription
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// Get subscription statistics
const getSubscriptionStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().toISOString().slice(0, 7);

    const totalMembers = await User.countDocuments({
      role: { $in: ['Member', 'PlotOwner'] },
      isActive: true
    });

    const stats = await Subscription.aggregate([
      {
        $match: { year: currentYear }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const monthlyStats = await Subscription.aggregate([
      {
        $match: { month: currentMonth }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const paidCount = stats.find(s => s._id === 'paid')?.count || 0;
    const pendingCount = stats.find(s => s._id === 'pending')?.count || 0;

    res.json({
      success: true,
      stats: {
        totalMembers,
        paidCount,
        pendingCount,
        collectionRate: totalMembers > 0 ? ((paidCount / totalMembers) * 100).toFixed(1) : 0,
        totalCollection: stats.reduce((sum, stat) => sum + stat.totalAmount, 0),
        monthlyStats
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription stats',
      error: error.message
    });
  }
};

// Helper functions for notifications
const sendPaymentNotification = async (subscription, member) => {
  try {
    const financeTeam = await User.find({
      role: { $in: ['FinanceSecretary', 'Treasurer', 'admin'] },
      isActive: true
    });

    const notification = new Notification({
      to: financeTeam.map(user => user._id),
      from: member._id,
      type: 'payment',
      title: 'New Payment Submitted',
      body: `${member.firstName} ${member.lastName} submitted payment for ${subscription.month}-${subscription.year}`,
      meta: {
        subscriptionId: subscription._id,
        amount: subscription.amount,
        paymentMethod: subscription.paymentMethod
      }
    });

    await notification.save();
  } catch (error) {
    console.error('Payment notification error:', error);
  }
};

const sendVerificationNotification = async (subscription, verifiedBy) => {
  try {
    const notification = new Notification({
      to: [subscription.member],
      from: verifiedBy._id,
      type: 'payment',
      title: 'Payment Verified',
      body: `Your payment for ${subscription.month}-${subscription.year} has been verified`,
      meta: {
        subscriptionId: subscription._id,
        status: subscription.status
      }
    });

    await notification.save();
  } catch (error) {
    console.error('Verification notification error:', error);
  }
};

module.exports = {
  getSubscriptions,
  submitPayment,
  verifyPayment,
  getSubscriptionStats
};















