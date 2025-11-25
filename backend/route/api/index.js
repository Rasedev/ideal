

const express = require('express');
const router = express.Router();

const authenticationRoute = require('./authentication');
const userRoute = require("./user");
const adminRoute = require('./admin');
const hrRoute = require("./hrRoute");
const employeeRoute = require('./employeeRoute');
const memberRoute = require("./memberRoute");
const plotOwnerRoute = require("./plotOwnerRoute");
const userStatsRoute = require("./userStats");
const applicationRoute = require("./applicationRoute");
const subscriptionRoute = require("./subscription");
const announcementRoute = require("./announcement");
const paymentRoute = require("./payment");
const associationRoute = require("./association");
const dashbordRoute = require("./dashboard");
const chatRoute = require("./chat");
const smsRoute = require("./sms");
const noticeRoute = require("./notice");
const emailRoute = require("./email");
const contactRoute = require("./contact");
const eventRoute = require("./event");
const communityRoute = require("./community");
const welfareRoute = require("./welfare");
const reportsRoute = require("./reports");
const searchRoute = require("./search");
const notificationRoute = require('./notifications');
// const committeeRoute = require('./committee');
 const duesRoutes = require('./duesRoutes');
// const invoiceRoutes = require('./invoiceRoutes');
// const reportRoutes = require('./reportRoutes');
// const settingsRoutes = require('./settingsRoutes');




router.use('/authentication', authenticationRoute);
router.use("/user", userRoute);
router.use('/admin', adminRoute);
router.use("/hr", hrRoute);
router.use('/employee', employeeRoute);
router.use("/member", memberRoute);
// router.use('/committee', committeeRoute);
router.use("/plot-owner", plotOwnerRoute);
router.use("/userstats", userStatsRoute);
router.use("/announcement", announcementRoute);

router.use("/subscription", subscriptionRoute);
router.use("/payment", paymentRoute);
 router.use('/dues', duesRoutes);
// router.use('/invoices', invoiceRoutes);
// router.use('/reports', reportRoutes);
// router.use('/settings', settingsRoutes);

router.use("/association", associationRoute);
router.use("/dashboard", dashbordRoute);
router.use('/email', emailRoute);
router.use("/chat", chatRoute);
router.use('/contact', contactRoute);
router.use("/sms", smsRoute);
router.use("/application", applicationRoute);
router.use("/notices", noticeRoute);
router.use('/events', eventRoute);
router.use('/community', communityRoute);
router.use('/welfare', welfareRoute);
router.use('/reports', reportsRoute);
router.use('/search', searchRoute);
router.use('/notifications', notificationRoute);



module.exports = router;
