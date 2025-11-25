
/////////////////First Version/////////////////////

// const { ObjectId } = require ('mongodb')
// const SSLCommerzPayment = require('sslcommerz-lts')
// const store_id = 'test67c884299e457'
// const store_passwd = 'test67c884299e457@ssl'
// const is_live = false //true for live, false for sandbox
// const tran_id = new ObjectId().toString()
// //console.log(tran_id)


// function paymentController(req,res){
//     //console.log(tran_id)  
//     //console.log(req.body)

//     const data = {
//         total_amount: 100,
//         currency: 'BDT',
//         tran_id: tran_id, // use unique tran_id for each api call
//         success_url: 'http://localhost:3030/success',
//         fail_url: 'http://localhost:3030/fail',
//         cancel_url: 'http://localhost:3030/cancel',
//         ipn_url: 'http://localhost:3030/ipn',
//         shipping_method: 'Courier',
//         product_name: 'Computer.',
//         product_category: 'Electronic',
//         product_profile: 'general',
//         cus_name: 'Customer Name',
//         cus_email: 'customer@example.com',
//         cus_add1: 'Dhaka',
//         cus_add2: 'Dhaka',
//         cus_city: 'Dhaka',
//         cus_state: 'Dhaka',
//         cus_postcode: '1000',
//         cus_country: 'Bangladesh',
//         cus_phone: '01711111111',
//         cus_fax: '01711111111',
//         ship_name: 'Customer Name',
//         ship_add1: 'Dhaka',
//         ship_add2: 'Dhaka',
//         ship_city: 'Dhaka',
//         ship_state: 'Dhaka',
//         ship_postcode: 1000,
//         ship_country: 'Bangladesh',
//     };
//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
//     // sslcz.init(data).then(apiResponse => {
        
//     //     let GatewayPageURL = apiResponse.GatewayPageURL
//     //     //res.redirect(GatewayPageURL)
//     //     //console.log('Redirecting to: ', GatewayPageURL)
//     //     res.json( {GatewayPageURL});
//     // });
//     sslcz.init(data).then(apiResponse => {
//         let GatewayPageURL = apiResponse.GatewayPageURL;
//         res.json({ GatewayPageURL }); // ✅ Send structured JSON
//     });
    
      

// }


// module.exports = paymentController



/////////////////Second Version/////////////////////


// const Subscription = require("../models/subscriptionSchema");

//  const Payment = require("../models/PaymentSchema");
// const User = require("../models/userSchema");
// const MemberProfile = require("../models/MemberProfile");
// const Notification = require("../models/Notification");

// // ✅ Submit Payment (Member submits payment proof)
// const submitPayment = async (req, res) => {
//   try {
//     const {
//       amount,
//       paymentMethod,
//       transactionId,
//       month,
//       year,
//       bankDetails,
//       mobileBankingDetails,
//       notes
//     } = req.body;

//     // Validate required fields
//     if (!amount || !paymentMethod || !transactionId || !month || !year) {
//       return res.status(400).json({
//         success: false,
//         message: "Amount, payment method, transaction ID, month, and year are required"
//       });
//     }

//     // Check if subscription already exists for this month
//     const existingSubscription = await Subscription.findOne({
//       member: req.user._id,
//       month,
//       year
//     });

//     if (existingSubscription) {
//       return res.status(400).json({
//         success: false,
//         message: "Subscription for this month already exists"
//       });
//     }

//     // Check for duplicate transaction ID
//     const duplicateTransaction = await Subscription.findOne({ transactionId });
//     if (duplicateTransaction) {
//       return res.status(400).json({
//         success: false,
//         message: "Transaction ID already exists"
//       });
//     }

//     // Create subscription
//     const subscriptionData = {
//       member: req.user._id,
//       amount,
//       paymentMethod,
//       transactionId,
//       month,
//       year,
//       status: "Pending",
//       paidAt: new Date(),
//       notes
//     };

//     // Add payment method specific details
//     if (paymentMethod === "Bank" && bankDetails) {
//       subscriptionData.bankDetails = bankDetails;
//     } else if (["bKash", "Nagad", "Rocket"].includes(paymentMethod) && mobileBankingDetails) {
//       subscriptionData.mobileBankingDetails = {
//         provider: paymentMethod,
//         ...mobileBankingDetails
//       };
//     } else if (paymentMethod === "Cash") {
//       subscriptionData.cashDetails = {
//         receivedBy: req.user._id,
//         receivedAt: new Date()
//       };
//     }

//     // Handle file upload (payment proof)
//     if (req.file) {
//       subscriptionData.proofDocument = {
//         filename: req.file.filename,
//         url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
//         uploadedAt: new Date()
//       };
//     }

//     const subscription = new Subscription(subscriptionData);
//     await subscription.save();

//     // Populate response
//     const populatedSubscription = await Subscription.findById(subscription._id)
//       .populate("member", "firstName lastName email membershipId");

//     // Send notification to Finance Secretary
//     await sendPaymentNotification(subscription, req.user);

//     res.status(201).json({
//       success: true,
//       message: "Payment submitted successfully. Waiting for verification.",
//       subscription: populatedSubscription
//     });

//   } catch (error) {
//     console.error("Payment submission error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error submitting payment",
//       error: error.message
//     });
//   }
// };

// // ✅ Verify Payment (Finance Secretary verifies)
// const verifyPayment = async (req, res) => {
//   try {
//     const { subscriptionId } = req.params;
//     const { status, notes } = req.body;

//     if (!["Completed", "Verified", "Failed", "UnderReview"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status value"
//       });
//     }

//     const updateData = {
//       status,
//       verifiedBy: req.user._id,
//       verifiedAt: new Date()
//     };

//     if (notes) {
//       updateData.notes = notes;
//     }

//     const subscription = await Subscription.findByIdAndUpdate(
//       subscriptionId,
//       updateData,
//       { new: true }
//     )
//     .populate("member", "firstName lastName email phone")
//     .populate("verifiedBy", "firstName lastName");

//     if (!subscription) {
//       return res.status(404).json({
//         success: false,
//         message: "Subscription not found"
//       });
//     }

//     // Send notification to member about verification status
//     await sendVerificationNotification(subscription, req.user);

//     res.json({
//       success: true,
//       message: `Payment ${status.toLowerCase()} successfully`,
//       subscription
//     });

//   } catch (error) {
//     console.error("Payment verification error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error verifying payment",
//       error: error.message
//     });
//   }
// };

// // ✅ Get Member's Payment History
// const getMyPayments = async (req, res) => {
//   try {
//     const { page = 1, limit = 12, year } = req.query;
//     const skip = (page - 1) * limit;

//     let filter = { member: req.user._id };
//     if (year) filter.year = year;

//     const payments = await Subscription.find(filter)
//       .populate("verifiedBy", "firstName lastName")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Subscription.countDocuments(filter);

//     // Calculate payment statistics
//     const totalPaid = await Subscription.countDocuments({
//       ...filter,
//       status: { $in: ["Completed", "Verified"] }
//     });

//     const pendingPayments = await Subscription.countDocuments({
//       ...filter,
//       status: "Pending"
//     });

//     res.json({
//       success: true,
//       payments,
//       statistics: {
//         total,
//         totalPaid,
//         pendingPayments
//       },
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error("Get payments error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching payments",
//       error: error.message
//     });
//   }
// };

// // ✅ Get All Payments (Admin/Finance Secretary)
// const getAllPayments = async (req, res) => {
//   try {
//     const { page = 1, limit = 20, status, paymentMethod, month, year } = req.query;
//     const skip = (page - 1) * limit;

//     let filter = {};
//     if (status) filter.status = status;
//     if (paymentMethod) filter.paymentMethod = paymentMethod;
//     if (month) filter.month = month;
//     if (year) filter.year = year;

//     const payments = await Subscription.find(filter)
//       .populate("member", "firstName lastName email membershipId phone")
//       .populate("verifiedBy", "firstName lastName")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await Subscription.countDocuments(filter);

//     res.json({
//       success: true,
//       payments,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error("Get all payments error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching payments",
//       error: error.message
//     });
//   }
// };

// // ✅ Get Payment Statistics
// const getPaymentStats = async (req, res) => {
//   try {
//     const currentMonth = new Date().toISOString().slice(0, 7);
//     const currentYear = new Date().getFullYear().toString();

//     const totalMembers = await User.countDocuments({
//       role: { $in: ["Member", "PlotOwner"] },
//       isActive: true
//     });

//     const totalPayments = await Subscription.countDocuments({
//       year: currentYear
//     });

//     const verifiedPayments = await Subscription.countDocuments({
//       year: currentYear,
//       status: { $in: ["Completed", "Verified"] }
//     });

//     const pendingPayments = await Subscription.countDocuments({
//       year: currentYear,
//       status: "Pending"
//     });

//     const totalRevenue = await Subscription.aggregate([
//       {
//         $match: {
//           year: currentYear,
//           status: { $in: ["Completed", "Verified"] }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$amount" }
//         }
//       }
//     ]);

//     const paymentMethods = await Subscription.aggregate([
//       {
//         $match: { year: currentYear }
//       },
//       {
//         $group: {
//           _id: "$paymentMethod",
//           count: { $sum: 1 },
//           totalAmount: { $sum: "$amount" }
//         }
//       }
//     ]);

//     res.json({
//       success: true,
//       stats: {
//         totalMembers,
//         totalPayments,
//         verifiedPayments,
//         pendingPayments,
//         totalRevenue: totalRevenue[0]?.total || 0,
//         paymentRate: totalMembers > 0 ? ((verifiedPayments / totalMembers) * 100).toFixed(1) : 0,
//         paymentMethods
//       }
//     });

//   } catch (error) {
//     console.error("Payment stats error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching payment statistics",
//       error: error.message
//     });
//   }
// };

// // ✅ Helper function to send payment notification
// const sendPaymentNotification = async (subscription, member) => {
//   try {
//     // Find Finance Secretary users
//     const financeSecretaries = await User.find({ 
//       role: "FinanceSecretary",
//       isActive: true 
//     });

//     const notification = new Notification({
//       to: financeSecretaries.map(fs => fs._id),
//       from: member._id,
//       type: 'system',
//       channel: ['inapp'],
//       title: 'New Payment Submitted',
//       body: `${member.firstName} ${member.lastName} submitted payment for ${subscription.month}-${subscription.year}`,
//       meta: {
//         subscriptionId: subscription._id,
//         amount: subscription.amount,
//         paymentMethod: subscription.paymentMethod,
//         memberId: member._id
//       }
//     });

//     await notification.save();
//   } catch (error) {
//     console.error("Payment notification error:", error);
//   }
// };

// // ✅ Helper function to send verification notification
// const sendVerificationNotification = async (subscription, verifiedBy) => {
//   try {
//     const notification = new Notification({
//       to: [subscription.member._id],
//       from: verifiedBy._id,
//       type: 'personal',
//       channel: ['inapp'],
//       title: 'Payment Verification Update',
//       body: `Your payment for ${subscription.month}-${subscription.year} has been ${subscription.status}`,
//       meta: {
//         subscriptionId: subscription._id,
//         status: subscription.status,
//         verifiedBy: verifiedBy._id
//       }
//     });

//     await notification.save();
//   } catch (error) {
//     console.error("Verification notification error:", error);
//   }
// };

// module.exports = {
//   submitPayment,
//   verifyPayment,
//   getMyPayments,
//   getAllPayments,
//   getPaymentStats
// };



// controllers/paymentController.js
const SubscriptionPayment = require('../models/SubscriptionPayment');
const User = require('../models/userSchema');

// @desc    Submit payment
// @route   POST /api/v1/payments/submit
// @access  Private (All authenticated users)
const submitPayment = async (req, res) => {
  try {
    const {
      paymentMonth,
      paymentYear,
      amount,
      paymentMethod,
      transactionId,
      transactionDate,
      bankName,
      accountNumber,
      branchName,
      senderPhone,
      receiverPhone
    } = req.body;

    // Validation
    if (!paymentMonth || !paymentYear || !amount || !paymentMethod || !transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: paymentMonth, paymentYear, amount, paymentMethod, transactionId'
      });
    }

    // Check if payment already exists for this month
    const existingPayment = await SubscriptionPayment.findOne({
      member: req.user._id,
      paymentMonth,
      paymentYear
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'Payment already submitted for this month'
      });
    }

    // Check for duplicate transaction ID
    const duplicateTransaction = await SubscriptionPayment.findOne({ transactionId });
    if (duplicateTransaction) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID already exists'
      });
    }

    // Create payment
    const paymentData = {
      member: req.user._id,
      paymentMonth,
      paymentYear: parseInt(paymentYear),
      amount: parseFloat(amount),
      paymentMethod,
      transactionId,
      transactionDate: transactionDate ? new Date(transactionDate) : new Date(),
      status: 'pending'
    };

    // Add payment method specific details
    if (paymentMethod === 'bank_transfer') {
      paymentData.bankName = bankName;
      paymentData.accountNumber = accountNumber;
      paymentData.branchName = branchName;
    } else if (['bkash', 'nagad', 'rocket'].includes(paymentMethod)) {
      paymentData.senderPhone = senderPhone;
      paymentData.receiverPhone = receiverPhone;
    }

    // Handle file upload
    if (req.file) {
      paymentData.paymentProof = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: `/uploads/payments/${req.file.filename}`,
        uploadedAt: new Date()
      };
    }

    const payment = await SubscriptionPayment.create(paymentData);

    // Populate member details for response
    await payment.populate('member', 'firstName lastName email phone membershipId role');

    res.status(201).json({
      success: true,
      message: 'Payment submitted successfully. Waiting for verification.',
      payment
    });

  } catch (error) {
    console.error('Submit payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting payment',
      error: error.message
    });
  }
};

// @desc    Get all payments (Admin/Finance Secretary)
// @route   GET /api/v1/payments
// @access  Private (Admin, FinanceSecretary)
const getAllPayments = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      paymentMethod,
      paymentMonth,
      paymentYear,
      memberId,
      role
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;
    if (paymentMonth) filter.paymentMonth = paymentMonth;
    if (paymentYear) filter.paymentYear = parseInt(paymentYear);
    if (memberId) filter.member = memberId;

    // Execute query with member population
    const payments = await SubscriptionPayment.find(filter)
      .populate({
        path: 'member',
        select: 'firstName lastName email phone membershipId role image',
        match: role ? { role } : {} // Filter by member role if provided
      })
      .populate('verifiedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SubscriptionPayment.countDocuments(filter);

    res.json({
      success: true,
      payments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalPayments: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
};

// @desc    Get comprehensive payment overview (ALL members status)
// @route   GET /api/v1/payments/overview
// @access  Private (Admin, FinanceSecretary)
const getPaymentOverview = async (req, res) => {
  try {
    const { paymentMonth, paymentYear } = req.query;
    
    if (!paymentMonth || !paymentYear) {
      return res.status(400).json({
        success: false,
        message: 'paymentMonth and paymentYear are required'
      });
    }

    // Get ALL active users (all roles)
    const allMembers = await User.find({ 
      isActive: true
    }).select('_id firstName lastName email phone membershipId role');

    // Get payments for this month
    const monthlyPayments = await SubscriptionPayment.find({
      paymentMonth,
      paymentYear: parseInt(paymentYear)
    }).populate('member', 'firstName lastName membershipId role');

    // Create a map of members who have paid
    const paidMembersMap = new Map();
    monthlyPayments.forEach(payment => {
      if (payment.member) {
        paidMembersMap.set(payment.member._id.toString(), {
          payment,
          status: payment.status
        });
      }
    });

    // Create overview with all members and their payment status
    const paymentOverview = allMembers.map(member => {
      const paymentInfo = paidMembersMap.get(member._id.toString());
      return {
        member: {
          _id: member._id,
          firstName: member.firstName,
          lastName: member.lastName,
          membershipId: member.membershipId,
          role: member.role,
          email: member.email,
          phone: member.phone
        },
        paymentStatus: paymentInfo ? paymentInfo.status : 'not_paid',
        payment: paymentInfo ? paymentInfo.payment : null,
        amount: 500, // Fixed monthly amount
        dueDate: new Date(`${paymentYear}-${getMonthNumber(paymentMonth)}-10`),
        isOverdue: paymentInfo ? 
          (paymentInfo.status === 'pending' && new Date() > new Date(`${paymentYear}-${getMonthNumber(paymentMonth)}-10`)) 
          : (new Date() > new Date(`${paymentYear}-${getMonthNumber(paymentMonth)}-10`))
      };
    });

    // Statistics
    const totalMembers = allMembers.length;
    const paidCount = paymentOverview.filter(p => p.paymentStatus === 'verified').length;
    const pendingCount = paymentOverview.filter(p => p.paymentStatus === 'pending').length;
    const notPaidCount = paymentOverview.filter(p => p.paymentStatus === 'not_paid').length;
    const overdueCount = paymentOverview.filter(p => p.isOverdue).length;

    res.json({
      success: true,
      overview: paymentOverview,
      statistics: {
        totalMembers,
        paidCount,
        pendingCount,
        notPaidCount,
        overdueCount,
        collectionRate: totalMembers > 0 ? ((paidCount / totalMembers) * 100).toFixed(1) : 0,
        totalExpected: totalMembers * 500,
        totalCollected: paidCount * 500
      },
      period: {
        month: paymentMonth,
        year: paymentYear
      }
    });

  } catch (error) {
    console.error('Get payment overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment overview',
      error: error.message
    });
  }
};

// Helper function to get month number
function getMonthNumber(monthName) {
  const months = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  return months[monthName.split('-')[0]] || '01';
}

// @desc    Get my payments (Individual member)
// @route   GET /api/v1/payments/my-payments
// @access  Private (All authenticated users)
const getMyPayments = async (req, res) => {
  try {
    const { page = 1, limit = 12, status, year } = req.query;

    const filter = { member: req.user._id };
    if (status) filter.status = status;
    if (year) filter.paymentYear = parseInt(year);

    const payments = await SubscriptionPayment.find(filter)
      .populate('verifiedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SubscriptionPayment.countDocuments(filter);

    // Calculate statistics for this user
    const totalPaid = await SubscriptionPayment.countDocuments({
      ...filter,
      status: 'verified'
    });
    const pendingPayments = await SubscriptionPayment.countDocuments({
      ...filter,
      status: 'pending'
    });
    const totalAmountPaid = await SubscriptionPayment.aggregate([
      { $match: { ...filter, status: 'verified' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      payments,
      userStats: {
        total,
        totalPaid,
        pendingPayments,
        totalAmountPaid: totalAmountPaid[0]?.total || 0,
        paymentRate: total > 0 ? ((totalPaid / total) * 100).toFixed(1) : 0
      },
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalPayments: total
      }
    });

  } catch (error) {
    console.error('Get my payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
};

// @desc    Verify payment
// @route   PATCH /api/v1/payments/verify/:paymentId
// @access  Private (Admin, FinanceSecretary)
const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either "verified" or "rejected"'
      });
    }

    const updateData = {
      status,
      verifiedBy: req.user._id,
      verifiedAt: new Date()
    };

    if (status === 'verified') {
      updateData.paidAt = new Date();
    }

    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const payment = await SubscriptionPayment.findByIdAndUpdate(
      paymentId,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('member', 'firstName lastName email phone role membershipId')
    .populate('verifiedBy', 'firstName lastName');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      message: `Payment ${status} successfully`,
      payment
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// @desc    Get comprehensive payment statistics
// @route   GET /api/v1/payments/stats
// @access  Private (Admin, FinanceSecretary)
const getPaymentStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    // Get ALL active members (all roles)
    const totalMembers = await User.countDocuments({
      isActive: true
    });

    // Current year statistics
    const yearlyStats = await SubscriptionPayment.aggregate([
      {
        $match: { paymentYear: currentYear }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Current month statistics
    const currentMonthPayments = await SubscriptionPayment.countDocuments({
      paymentYear: currentYear,
      paymentMonth: currentMonth + '-' + currentYear
    });

    // Payment methods distribution
    const paymentMethodsStats = await SubscriptionPayment.aggregate([
      {
        $match: { paymentYear: currentYear }
      },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Role-based payment statistics
    const roleStats = await SubscriptionPayment.aggregate([
      {
        $match: { paymentYear: currentYear }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'member',
          foreignField: '_id',
          as: 'memberInfo'
        }
      },
      {
        $unwind: '$memberInfo'
      },
      {
        $group: {
          _id: '$memberInfo.role',
          totalMembers: { $addToSet: '$member' },
          paidCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'verified'] }, 1, 0]
            }
          },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Calculate totals
    const verifiedPayments = yearlyStats.find(stat => stat._id === 'verified') || { count: 0, totalAmount: 0 };
    const pendingPayments = yearlyStats.find(stat => stat._id === 'pending') || { count: 0, totalAmount: 0 };

    res.json({
      success: true,
      stats: {
        totalMembers,
        totalPayments: yearlyStats.reduce((sum, stat) => sum + stat.count, 0),
        verifiedPayments: verifiedPayments.count,
        pendingPayments: pendingPayments.count,
        currentMonthPayments,
        totalRevenue: verifiedPayments.totalAmount,
        collectionRate: totalMembers > 0 ? ((verifiedPayments.count / totalMembers) * 100).toFixed(1) : 0,
        paymentMethods: paymentMethodsStats,
        roleStats: roleStats,
        expectedRevenue: totalMembers * 500 * 12, // Yearly expected
        collectedPercentage: totalMembers > 0 ? ((verifiedPayments.totalAmount / (totalMembers * 500 * 12)) * 100).toFixed(1) : 0
      }
    });

  } catch (error) {
    console.error('Payment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment statistics',
      error: error.message
    });
  }
};

module.exports = {
  submitPayment,
  getAllPayments,
  getPaymentOverview,
  getMyPayments,
  verifyPayment,
  getPaymentStats
};
