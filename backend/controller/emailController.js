


// const Email = require('../models/emailSchema');
// const User = require('../models/userSchema');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');

// // Create email transporter
// // Create email transporter with better configuration
// const createTransporter = () => {
//   return nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false
//     },
//     debug: true, // Enable debug output
//     logger: true // Enable logger
//   });
// };

// // Enhanced test function with better logging
// const testEmailController = async (req, res) => {
//   try {
//     const { 
//       recipientIds, 
//       subject = 'Test Email from Association System',
//       message = 'This is a test email to verify email configuration.',
//       priority = 'medium',
//       category = 'notification'
//     } = req.body;

//     const senderId = req.user.userId;

//     console.log('🧪 Testing email configuration...');

//      // ✅ ENHANCED: Better environment variable checking
//     console.log('🔧 Environment Check:');
//     console.log('  EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
//     console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
//     console.log('  NODE_ENV:', process.env.NODE_ENV);


//     // Get sender info
//     const sender = await User.findById(senderId).select('firstName lastName email');
//     if (!sender) {
//       return res.status(404).json({
//         success: false,
//         message: 'Sender not found'
//       });
//     }

//     // Check if email configuration exists
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//       return res.status(500).json({
//         success: false,
//         message: 'Email service not configured properly',
//         configuration: {
//           hasEmailUser: !!process.env.EMAIL_USER,
//           hasEmailPass: !!process.env.EMAIL_PASS,
//           emailUser: process.env.EMAIL_USER || 'Missing',
//           nodeEnv: process.env.NODE_ENV || 'development'
//         },
//         instructions: [
//           '1. Check your .env file is in the backend root directory',
//           '2. Verify EMAIL_USER and EMAIL_PASS are set correctly',
//           '3. Restart your server after updating .env',
//           '4. For Gmail: Use App Password (16 characters) not regular password'
//         ]
//       });
//     }

//     // Get test recipients (use provided IDs or default to sender)
//     let testRecipients = [];
//     if (recipientIds && recipientIds.length > 0) {
//       const users = await User.find({ 
//         _id: { $in: recipientIds },
//         isActive: true 
//       }).select('email firstName lastName');
//       testRecipients = users;
//     } else {
//       // Use sender as test recipient
//       testRecipients = [sender];
//     }

//     // Create transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Test email content
//     const testEmailContent = `
// This is a TEST email from Alamgir Hossain City Welfare Association.

// Email Configuration Test:
// - Sender: ${sender.firstName} ${sender.lastName}
// - From: ${process.env.EMAIL_USER}
// - To: ${testRecipients.map(r => r.email).join(', ')}
// - Server: ${process.env.NODE_ENV || 'development'}

// If you received this email, your email configuration is working correctly!

// Original Message:
// ${message}

// ---
// This is an automated test message.
// Association Communication System
//     `;

//     const testHtmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
//         .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
//         .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
//         .test-info { background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #1890ff; }
//         .success { background: #f6ffed; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #52c41a; }
//         .original-message { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border: 1px solid #ddd; }
//     </style>
// </head>
// <body>
//     <div class="header">
//         <h1>✅ Email Test Successful</h1>
//         <p>Alamgir Hossain City Welfare Association</p>
//     </div>
//     <div class="content">
//         <div class="success">
//             <h3>🎉 Congratulations!</h3>
//             <p>Your email configuration is working correctly.</p>
//         </div>
        
//         <div class="test-info">
//             <h4>Test Details:</h4>
//             <ul>
//                 <li><strong>Sender:</strong> ${sender.firstName} ${sender.lastName}</li>
//                 <li><strong>From:</strong> ${process.env.EMAIL_USER}</li>
//                 <li><strong>To:</strong> ${testRecipients.map(r => r.email).join(', ')}</li>
//                 <li><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</li>
//                 <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
//             </ul>
//         </div>

//         <div class="original-message">
//             <h4>Original Test Message:</h4>
//             <p>${message.replace(/\n/g, '<br>')}</p>
//         </div>

//         <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
//             <p style="color: #666; font-size: 12px;">
//                 This is an automated test message from the Association Communication System.
//             </p>
//         </div>
//     </div>
// </body>
// </html>
//     `;

//     // Send test emails
//     const results = [];
//     for (const recipient of testRecipients) {
//       try {
//         const mailOptions = {
//           from: {
//             name: `Test - ${sender.firstName} ${sender.lastName} (Association)`,
//             address: process.env.EMAIL_USER
//           },
//           to: recipient.email,
//           subject: `[TEST] ${subject}`,
//           text: testEmailContent,
//           html: testHtmlContent
//         };

//         console.log(`📧 Sending test email to: ${recipient.email}`);
        
//         const result = await transporter.sendMail(mailOptions);
        
//         console.log(`✅ Test email sent to ${recipient.email}:`, result.messageId);
        
//         results.push({
//           email: recipient.email,
//           status: 'sent',
//           messageId: result.messageId,
//           response: result.response
//         });

//       } catch (error) {
//         console.error(`❌ Failed to send test email to ${recipient.email}:`, error);
        
//         results.push({
//           email: recipient.email,
//           status: 'failed',
//           error: error.message
//         });
//       }
//     }

//     // Check results
//     const successfulSends = results.filter(r => r.status === 'sent').length;
//     const failedSends = results.filter(r => r.status === 'failed').length;

//     const responseMessage = failedSends === 0 
//       ? `✅ Test successful! ${successfulSends} test email(s) sent successfully.`
//       : `⚠️ Test completed with issues. ${successfulSends} sent, ${failedSends} failed.`;

//     res.status(200).json({
//       success: failedSends === 0,
//       message: responseMessage,
//       results: results,
//       configuration: {
//         emailService: 'gmail',
//         fromEmail: process.env.EMAIL_USER,
//         totalRecipients: testRecipients.length,
//         successful: successfulSends,
//         failed: failedSends
//       }
//     });

//   } catch (error) {
//     console.error('❌ Email test error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Email test failed',
//       error: error.message,
//       configurationCheck: {
//         hasEmailUser: !!process.env.EMAIL_USER,
//         hasEmailPass: !!process.env.EMAIL_PASS,
//         nodeEnv: process.env.NODE_ENV
//       }
//     });
//   }
// };

// // Alternative SMTP configuration (if you have your own email server)
// const createSMTPTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.SMTP_HOST || 'smtp.gmail.com',
//     port: process.env.SMTP_PORT || 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
// };

// // @desc    Send email to multiple users
// // @route   POST /api/v1/email/send
// // @access  Private
// const sendEmailController = async (req, res) => {
//   try {
//     const { 
//       recipientIds, 
//       subject, 
//       message, 
//       priority = 'medium',
//       category = 'notification',
//       isDraft = false 
//     } = req.body;

//     const senderId = req.user.userId;

//     console.log('📧 Send email request:', { 
//       senderId, 
//       recipientCount: recipientIds?.length,
//       subject,
//       isDraft 
//     });

//     // Validate required fields
//     if (!subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: 'Subject and message are required'
//       });
//     }

//     if (!recipientIds || recipientIds.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'At least one recipient is required'
//       });
//     }

//     // Get sender info
//     const sender = await User.findById(senderId).select('firstName lastName email');
//     if (!sender) {
//       return res.status(404).json({
//         success: false,
//         message: 'Sender not found'
//       });
//     }

//     // Process user IDs to get emails
//     const users = await User.find({ 
//       _id: { $in: recipientIds },
//       isActive: true 
//     }).select('email firstName lastName');

//     if (users.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No valid recipients found'
//       });
//     }

//     const recipients = users.map(user => ({
//       user: user._id,
//       email: user.email,
//       name: `${user.firstName} ${user.lastName}`,
//       status: isDraft ? 'draft' : 'pending'
//     }));

//     // Create email record
//     const emailData = {
//       sender: senderId,
//       recipients: recipients,
//       subject,
//       message,
//       messageType: 'text',
//       priority,
//       category,
//       isDraft,
//       sentAt: isDraft ? null : new Date()
//     };

//     const email = await Email.create(emailData);

//     // Send actual emails if not draft
//     let emailResults = [];
//     if (!isDraft) {
//       emailResults = await sendActualEmails(email, recipients, sender, subject, message);
      
//       // Update email status based on sending results
//       await updateEmailStatus(email._id, emailResults);
//     }

//     // Populate the created email for response
//     const populatedEmail = await Email.findById(email._id)
//       .populate('sender', 'firstName lastName email profilePhoto role')
//       .populate('recipients.user', 'firstName lastName email profilePhoto role');

//     console.log('✅ Email created successfully:', email._id);

//     const responseMessage = isDraft 
//       ? 'Email saved as draft' 
//       : `Email sent to ${recipients.length} recipients`;

//     res.status(201).json({
//       success: true,
//       message: responseMessage,
//       data: populatedEmail,
//       sendingResults: isDraft ? undefined : emailResults
//     });

//   } catch (error) {
//     console.error('❌ Send email error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send email',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Helper function to send actual emails
// const sendActualEmails = async (email, recipients, sender, subject, message) => {
//   const results = [];
  
//   // Check if email configuration exists
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     console.warn('⚠️ Email credentials not configured. Emails will be stored but not sent.');
    
//     // Mark all as failed due to missing configuration
//     for (const recipient of recipients) {
//       results.push({
//         email: recipient.email,
//         status: 'failed',
//         error: 'Email service not configured'
//       });
//     }
//     return results;
//   }

//   const transporter = createTransporter();

//   for (const recipient of recipients) {
//     try {
//       const mailOptions = {
//         from: {
//           name: `${sender.firstName} ${sender.lastName} - Alamgir Hossain City Welfare Association`,
//           address: process.env.EMAIL_USER
//         },
//         to: recipient.email,
//         subject: subject,
//         text: `
// Dear ${recipient.name},

// ${message}

// ---
// Best regards,
// ${sender.firstName} ${sender.lastName}
// Alamgir Hossain City Welfare Association
// ${sender.email}

// This email was sent via the Association Communication System.
//         `,
//         html: `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//         .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
//         .content { padding: 20px; background: #f9f9f9; }
//         .message { background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
//         .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #ddd; margin-top: 20px; }
//         .association-name { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
//     </style>
// </head>
// <body>
//     <div class="header">
//         <div class="association-name">Alamgir Hossain City Welfare Association</div>
//         <div>Official Communication</div>
//     </div>
//     <div class="content">
//         <div class="message">
//             <p>Dear <strong>${recipient.name}</strong>,</p>
//             <div style="white-space: pre-line; margin: 20px 0;">${message}</div>
//             <p>Best regards,<br>
//             <strong>${sender.firstName} ${sender.lastName}</strong><br>
//             Alamgir Hossain City Welfare Association<br>
//             <a href="mailto:${sender.email}">${sender.email}</a></p>
//         </div>
//     </div>
//     <div class="footer">
//         <p>This email was sent via the Association Communication System.</p>
//         <p>Please do not reply to this automated message.</p>
//     </div>
// </body>
// </html>
//         `
//       };

//       console.log(`📤 Sending email to: ${recipient.email}`);
      
//       const result = await transporter.sendMail(mailOptions);
      
//       console.log(`✅ Email sent to ${recipient.email}:`, result.messageId);
      
//       results.push({
//         email: recipient.email,
//         status: 'sent',
//         messageId: result.messageId,
//         response: result.response
//       });

//     } catch (error) {
//       console.error(`❌ Failed to send to ${recipient.email}:`, error);
      
//       results.push({
//         email: recipient.email,
//         status: 'failed',
//         error: error.message
//       });
//     }
//   }

//   return results;
// };

// // Update email status based on sending results
// const updateEmailStatus = async (emailId, results) => {
//   try {
//     for (const result of results) {
//       await Email.updateOne(
//         { _id: emailId, 'recipients.email': result.email },
//         { 
//           $set: { 
//             'recipients.$.status': result.status,
//             'recipients.$.sentAt': result.status === 'sent' ? new Date() : null,
//             'recipients.$.error': result.error || null
//           } 
//         }
//       );
//     }
    
//     // Update overall email status
//     const failedCount = results.filter(r => r.status === 'failed').length;
//     if (failedCount === results.length) {
//       await Email.updateOne(
//         { _id: emailId },
//         { $set: { status: 'failed' } }
//       );
//     } else if (failedCount > 0) {
//       await Email.updateOne(
//         { _id: emailId },
//         { $set: { status: 'partial' } }
//       );
//     } else {
//       await Email.updateOne(
//         { _id: emailId },
//         { $set: { status: 'sent' } }
//       );
//     }
    
//   } catch (error) {
//     console.error('Error updating email status:', error);
//   }
// };

// // ... (keep the other controller functions the same as before)
// const getAllEmailsController = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 20,
//       folder = 'inbox', // inbox, sent, draft, important
//       search
//     } = req.query;

//     const userId = req.user.userId;
//     let query = {};

//     console.log('📥 Fetching emails:', { userId, folder, search });

//     // Folder-based filtering
//     switch (folder) {
//       case 'inbox':
//         query = { 
//           'recipients.user': new mongoose.Types.ObjectId(userId),
//           isDraft: false 
//         };
//         break;
//       case 'sent':
//         query = { 
//           sender: new mongoose.Types.ObjectId(userId),
//           isDraft: false 
//         };
//         break;
//       case 'draft':
//         query = { 
//           sender: new mongoose.Types.ObjectId(userId),
//           isDraft: true 
//         };
//         break;
//       case 'important':
//         query = { 
//           $or: [
//             { 'recipients.user': new mongoose.Types.ObjectId(userId) },
//             { sender: new mongoose.Types.ObjectId(userId) }
//           ],
//           isImportant: true,
//           isDraft: false
//         };
//         break;
//       default:
//         query = { 
//           'recipients.user': new mongoose.Types.ObjectId(userId),
//           isDraft: false 
//         };
//     }

//     // Search filter
//     if (search) {
//       query.$or = [
//         { subject: { $regex: search, $options: 'i' } },
//         { message: { $regex: search, $options: 'i' } }
//       ];
//     }

//     const emails = await Email.find(query)
//       .populate('sender', 'firstName lastName email profilePhoto role')
//       .populate('recipients.user', 'firstName lastName email profilePhoto role')
//       .sort({ createdAt: -1 })
//       .limit(parseInt(limit))
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .lean();

//     const total = await Email.countDocuments(query);

//     console.log(`✅ Found ${emails.length} emails for user ${userId}`);

//     res.status(200).json({
//       success: true,
//       data: emails,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error('❌ Get emails error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch emails',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// const getEmailStatsController = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     console.log('📊 Fetching email stats for user:', userId);

//     // Using Promise.all for better performance
//     const [inbox, sent, drafts, important] = await Promise.all([
//       // Inbox count
//       Email.countDocuments({ 
//         'recipients.user': new mongoose.Types.ObjectId(userId),
//         isDraft: false 
//       }),
//       // Sent count
//       Email.countDocuments({ 
//         sender: new mongoose.Types.ObjectId(userId),
//         isDraft: false 
//       }),
//       // Drafts count
//       Email.countDocuments({ 
//         sender: new mongoose.Types.ObjectId(userId),
//         isDraft: true 
//       }),
//       // Important count
//       Email.countDocuments({ 
//         $or: [
//           { 'recipients.user': new mongoose.Types.ObjectId(userId) },
//           { sender: new mongoose.Types.ObjectId(userId) }
//         ],
//         isImportant: true,
//         isDraft: false
//       })
//     ]);

//     const stats = {
//       inbox,
//       sent,
//       drafts,
//       important,
//       total: inbox + sent + drafts
//     };

//     console.log('✅ Email stats:', stats);

//     res.status(200).json({
//       success: true,
//       data: stats
//     });

//   } catch (error) {
//     console.error('❌ Get email stats error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch email statistics',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// const getEmailUsersController = async (req, res) => {
//   try {
//     const { search } = req.query;
//     const currentUserId = req.user.userId;

//     console.log('👥 Fetching email users for:', currentUserId);

//     let query = { 
//       _id: { $ne: new mongoose.Types.ObjectId(currentUserId) },
//       isActive: true 
//     };
    
//     if (search) {
//       query.$or = [
//         { firstName: { $regex: search, $options: 'i' } },
//         { lastName: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } }
//       ];
//     }

//     const users = await User.find(query)
//       .select('firstName lastName email role profilePhoto membershipId isActive')
//       .sort({ firstName: 1, lastName: 1 })
//       .limit(50)
//       .lean();

//     console.log(`✅ Found ${users.length} users for email`);

//     res.status(200).json({
//       success: true,
//       data: users,
//       total: users.length
//     });

//   } catch (error) {
//     console.error('❌ Get email users error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch users',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// const updateEmailController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { isRead, isImportant } = req.body;
//     const userId = req.user.userId;

//     console.log('✏️ Updating email:', { id, isRead, isImportant });

//     const updateData = {};
//     if (isRead !== undefined) updateData.isRead = isRead;
//     if (isImportant !== undefined) updateData.isImportant = isImportant;

//     const email = await Email.findOneAndUpdate(
//       { 
//         _id: id,
//         $or: [
//           { sender: new mongoose.Types.ObjectId(userId) },
//           { 'recipients.user': new mongoose.Types.ObjectId(userId) }
//         ]
//       },
//       updateData,
//       { new: true }
//     )
//     .populate('sender', 'firstName lastName email profilePhoto role')
//     .populate('recipients.user', 'firstName lastName email profilePhoto role');

//     if (!email) {
//       return res.status(404).json({
//         success: false,
//         message: 'Email not found or access denied'
//       });
//     }

//     console.log('✅ Email updated successfully:', id);

//     res.status(200).json({
//       success: true,
//       message: 'Email updated successfully',
//       data: email
//     });

//   } catch (error) {
//     console.error('❌ Update email error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update email',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// const quickTestController = async (req, res) => {
//   try {
//     const senderId = req.user.userId;
    
//     // Get sender info
//     const sender = await User.findById(senderId).select('firstName lastName email');
//     if (!sender) {
//       return res.status(404).json({
//         success: false,
//         message: 'Sender not found'
//       });
//     }

//     // Check email configuration
//     const configCheck = {
//       hasEmailUser: !!process.env.EMAIL_USER,
//       hasEmailPass: !!process.env.EMAIL_PASS,
//       emailUser: process.env.EMAIL_USER || 'Not configured',
//       nodeEnv: process.env.NODE_ENV || 'development'
//     };

//     if (!configCheck.hasEmailUser || !configCheck.hasEmailPass) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email configuration incomplete',
//         configuration: configCheck,
//         instructions: [
//           '1. Check your .env file has EMAIL_USER and EMAIL_PASS',
//           '2. For Gmail: Enable 2FA and use App Password',
//           '3. Restart your server after updating .env'
//         ]
//       });
//     }

//     // Test email transporter
//     let transporterTest = { success: false, error: null };
//     try {
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });
      
//       // Verify transporter configuration
//       await transporter.verify();
//       transporterTest = { success: true, error: null };
//     } catch (transporterError) {
//       transporterTest = { success: false, error: transporterError.message };
//     }

//     res.status(200).json({
//       success: transporterTest.success,
//       message: transporterTest.success ? 'Email configuration looks good!' : 'Email configuration test failed',
//       configuration: configCheck,
//       transporterTest: transporterTest,
//       nextSteps: transporterTest.success ? [
//         'Send a test email to verify delivery',
//         'Check spam folder if emails not received'
//       ] : [
//         'Verify your email credentials',
//         'Check if 2FA is enabled for Gmail',
//         'Use App Password instead of regular password'
//       ]
//     });

//   } catch (error) {
//     console.error('❌ Quick test error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Quick test failed',
//       error: error.message
//     });
//   }
// };



// module.exports = {
//   sendEmailController,
//   getAllEmailsController,
//   getEmailStatsController,
//   getEmailUsersController,
//   updateEmailController,
//   testEmailController,
//   quickTestController
// };




// const Email = require('../models/emailSchema');
// const User = require('../models/userSchema');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');

// // Professional email transporter with better configuration
// const createTransporter = () => {
//   return nodemailer.createTransporter({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false
//     },
//     debug: process.env.NODE_ENV === 'development',
//     logger: process.env.NODE_ENV === 'development'
//   });
// };

// // @desc    Send email to multiple users (Professional)
// // @route   POST /api/v1/email/send
// // @access  Private (Admin/HR)
// const sendEmailController = async (req, res) => {
//   try {
//     const { 
//       recipientIds, 
//       subject, 
//       message, 
//       priority = 'medium',
//       category = 'notification',
//       isDraft = false 
//     } = req.body;

//     const senderId = req.user.userId;
//     const senderRole = req.user.role;

//     console.log('📧 Professional email sending initiated:', { 
//       senderId, 
//       senderRole,
//       recipientCount: recipientIds?.length,
//       subject,
//       isDraft 
//     });

//     // Validate required fields
//     if (!subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: 'Subject and message are required'
//       });
//     }

//     if (!recipientIds || recipientIds.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'At least one recipient is required'
//       });
//     }

//     // Get sender info
//     const sender = await User.findById(senderId).select('firstName lastName email role profilePhoto');
//     if (!sender) {
//       return res.status(404).json({
//         success: false,
//         message: 'Sender not found'
//       });
//     }

//     // Check permissions (Admin, HR, or specific roles can send emails)
//     const allowedRoles = ['Admin', 'HR', 'Manager', 'Executive'];
//     if (!allowedRoles.includes(sender.role)) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have permission to send emails'
//       });
//     }

//     // Process user IDs to get emails
//     const users = await User.find({ 
//       _id: { $in: recipientIds },
//       isActive: true 
//     }).select('email firstName lastName role profilePhoto');

//     if (users.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No valid recipients found'
//       });
//     }

//     console.log(`✅ Found ${users.length} valid recipients for email`);

//     const recipients = users.map(user => ({
//       user: user._id,
//       email: user.email,
//       name: `${user.firstName} ${user.lastName}`,
//       role: user.role,
//       status: isDraft ? 'draft' : 'pending'
//     }));

//     // Create email record
//     const emailData = {
//       sender: senderId,
//       recipients: recipients,
//       subject,
//       message,
//       messageType: 'text',
//       priority,
//       category,
//       isDraft,
//       sentAt: isDraft ? null : new Date(),
//       metadata: {
//         senderRole: sender.role,
//         totalRecipients: recipients.length,
//         recipientRoles: [...new Set(recipients.map(r => r.role))]
//       }
//     };

//     const email = await Email.create(emailData);

//     // Send actual emails if not draft
//     let emailResults = [];
//     if (!isDraft) {
//       emailResults = await sendProfessionalEmails(email, recipients, sender, subject, message);
      
//       // Update email status based on sending results
//       await updateEmailStatus(email._id, emailResults);
//     }

//     // Populate the created email for response
//     const populatedEmail = await Email.findById(email._id)
//       .populate('sender', 'firstName lastName email profilePhoto role')
//       .populate('recipients.user', 'firstName lastName email profilePhoto role');

//     console.log('✅ Professional email created successfully:', email._id);

//     const responseMessage = isDraft 
//       ? 'Email saved as draft' 
//       : `Email sent successfully to ${recipients.length} recipients`;

//     res.status(201).json({
//       success: true,
//       message: responseMessage,
//       data: populatedEmail,
//       sendingResults: isDraft ? undefined : emailResults,
//       summary: {
//         totalRecipients: recipients.length,
//         sent: emailResults.filter(r => r.status === 'sent').length,
//         failed: emailResults.filter(r => r.status === 'failed').length
//       }
//     });

//   } catch (error) {
//     console.error('❌ Professional email sending error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send email',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Professional email sending function
// const sendProfessionalEmails = async (email, recipients, sender, subject, message) => {
//   const results = [];
  
//   // Check if email configuration exists
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     console.warn('⚠️ Email credentials not configured. Emails will be stored but not sent.');
    
//     for (const recipient of recipients) {
//       results.push({
//         email: recipient.email,
//         name: recipient.name,
//         status: 'failed',
//         error: 'Email service not configured'
//       });
//     }
//     return results;
//   }

//   const transporter = createTransporter();

//   for (const recipient of recipients) {
//     try {
//       const mailOptions = {
//         from: {
//           name: `${sender.firstName} ${sender.lastName} - Alamgir Hossain City Welfare Association`,
//           address: process.env.EMAIL_USER
//         },
//         to: recipient.email,
//         subject: subject,
//         text: generatePlainTextEmail(recipient, sender, subject, message),
//         html: generateHtmlEmail(recipient, sender, subject, message),
//         // Professional headers
//         headers: {
//           'X-Priority': '3',
//           'X-MSMail-Priority': 'Normal',
//           'Importance': 'Normal'
//         }
//       };

//       console.log(`📤 Sending professional email to: ${recipient.name} <${recipient.email}>`);
      
//       const result = await transporter.sendMail(mailOptions);
      
//       console.log(`✅ Email delivered to ${recipient.email}:`, result.messageId);
      
//       results.push({
//         email: recipient.email,
//         name: recipient.name,
//         status: 'sent',
//         messageId: result.messageId,
//         response: result.response
//       });

//     } catch (error) {
//       console.error(`❌ Failed to send to ${recipient.email}:`, error);
      
//       results.push({
//         email: recipient.email,
//         name: recipient.name,
//         status: 'failed',
//         error: error.message
//       });
//     }
//   }

//   return results;
// };

// // Professional email templates
// const generatePlainTextEmail = (recipient, sender, subject, message) => {
//   return `
// Alamgir Hossain City Welfare Association
// Official Communication

// Dear ${recipient.name},

// ${message}

// ---
// Best regards,
// ${sender.firstName} ${sender.lastName}
// ${sender.role}
// Alamgir Hossain City Welfare Association
// Email: ${sender.email}

// This is an official communication from the association.
// Please do not reply to this automated message.
//   `;
// };

// const generateHtmlEmail = (recipient, sender, subject, message) => {
//   return `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="color-scheme" content="light">
//     <meta name="supported-color-schemes" content="light">
//     <style>
//         body { 
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
//             line-height: 1.6; 
//             color: #333; 
//             max-width: 600px; 
//             margin: 0 auto; 
//             background: #f5f5f5;
//             padding: 20px;
//         }
//         .email-container {
//             background: white;
//             border-radius: 10px;
//             box-shadow: 0 4px 6px rgba(0,0,0,0.1);
//             overflow: hidden;
//         }
//         .header { 
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
//             color: white; 
//             padding: 30px 20px; 
//             text-align: center; 
//         }
//         .association-name { 
//             font-size: 24px; 
//             font-weight: bold; 
//             margin-bottom: 10px; 
//         }
//         .content { 
//             padding: 30px; 
//         }
//         .greeting {
//             font-size: 16px;
//             margin-bottom: 20px;
//         }
//         .message-content { 
//             background: #f8f9fa; 
//             padding: 20px; 
//             border-radius: 8px; 
//             border-left: 4px solid #667eea;
//             margin: 20px 0; 
//         }
//         .signature {
//             border-top: 1px solid #e9ecef;
//             padding-top: 20px;
//             margin-top: 30px;
//         }
//         .footer { 
//             background: #2c3e50; 
//             color: white; 
//             padding: 20px; 
//             text-align: center; 
//             font-size: 12px; 
//         }
//         .important-note {
//             background: #fff3cd;
//             border: 1px solid #ffeaa7;
//             border-radius: 5px;
//             padding: 15px;
//             margin: 20px 0;
//             font-size: 12px;
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <div class="association-name">Alamgir Hossain City Welfare Association</div>
//             <div>Official Communication</div>
//         </div>
        
//         <div class="content">
//             <div class="greeting">
//                 <strong>Dear ${recipient.name},</strong>
//             </div>
            
//             <div class="message-content">
//                 <div style="white-space: pre-line; font-size: 14px; line-height: 1.6;">
//                     ${message}
//                 </div>
//             </div>

//             <div class="important-note">
//                 <strong>📌 Important:</strong> This is an official communication. 
//                 Please take appropriate action as required.
//             </div>
            
//             <div class="signature">
//                 <p>
//                     <strong>Best regards,</strong><br>
//                     <strong>${sender.firstName} ${sender.lastName}</strong><br>
//                     <em>${sender.role}</em><br>
//                     Alamgir Hossain City Welfare Association<br>
//                     <a href="mailto:${sender.email}" style="color: #667eea;">${sender.email}</a>
//                 </p>
//             </div>
//         </div>
        
//         <div class="footer">
//             <p>
//                 <strong>Alamgir Hossain City Welfare Association</strong><br>
//                 This is an automated official communication.<br>
//                 Please do not reply to this message.
//             </p>
//             <p style="margin-top: 10px; opacity: 0.8;">
//                 &copy; ${new Date().getFullYear()} Alamgir Hossain City Welfare Association. All rights reserved.
//             </p>
//         </div>
//     </div>
// </body>
// </html>
//   `;
// };

// // @desc    Get users for email with role-based filtering
// // @route   GET /api/v1/email/users
// // @access  Private
// const getEmailUsersController = async (req, res) => {
//   try {
//     const { search, role, department } = req.query;
//     const currentUserId = req.user.userId;
//     const currentUserRole = req.user.role;

//     console.log('👥 Fetching professional email users for:', { currentUserId, currentUserRole });

//     let query = { 
//       _id: { $ne: new mongoose.Types.ObjectId(currentUserId) },
//       isActive: true 
//     };
    
//     // Role-based filtering for security
//     if (role) {
//       query.role = role;
//     }
    
//     if (search) {
//       query.$or = [
//         { firstName: { $regex: search, $options: 'i' } },
//         { lastName: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//         { membershipId: { $regex: search, $options: 'i' } }
//       ];
//     }

//     const users = await User.find(query)
//       .select('firstName lastName email role profilePhoto membershipId isActive department phoneNumber')
//       .sort({ role: 1, firstName: 1, lastName: 1 })
//       .limit(100) // Increased limit for professional use
//       .lean();

//     console.log(`✅ Found ${users.length} users for professional email sending`);

//     // Group users by role for better organization
//     const usersByRole = users.reduce((acc, user) => {
//       if (!acc[user.role]) {
//         acc[user.role] = [];
//       }
//       acc[user.role].push(user);
//       return acc;
//     }, {});

//     res.status(200).json({
//       success: true,
//       data: users,
//       groupedByRole: usersByRole,
//       total: users.length,
//       roleCounts: Object.keys(usersByRole).reduce((acc, role) => {
//         acc[role] = usersByRole[role].length;
//         return acc;
//       }, {})
//     });

//   } catch (error) {
//     console.error('❌ Get professional email users error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch users',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // @desc    Send to all users (Bulk email - Admin only)
// // @route   POST /api/v1/email/broadcast
// // @access  Private (Admin only)
// const broadcastEmailController = async (req, res) => {
//   try {
//     const { 
//       subject, 
//       message, 
//       priority = 'medium',
//       category = 'announcement',
//       filters = {} // { role, department, etc. }
//     } = req.body;

//     const senderId = req.user.userId;
//     const senderRole = req.user.role;

//     console.log('📢 Broadcast email request:', { senderId, senderRole, subject, filters });

//     // Only Admin can send broadcast emails
//     if (senderRole !== 'Admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Only Administrators can send broadcast emails'
//       });
//     }

//     // Validate required fields
//     if (!subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: 'Subject and message are required for broadcast'
//       });
//     }

//     // Get sender info
//     const sender = await User.findById(senderId).select('firstName lastName email role');
//     if (!sender) {
//       return res.status(404).json({
//         success: false,
//         message: 'Sender not found'
//       });
//     }

//     // Build filter query for recipients
//     let recipientQuery = { isActive: true };
//     if (filters.role) {
//       recipientQuery.role = filters.role;
//     }
//     if (filters.department) {
//       recipientQuery.department = filters.department;
//     }

//     // Get all active users based on filters
//     const allUsers = await User.find(recipientQuery)
//       .select('email firstName lastName role')
//       .lean();

//     if (allUsers.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No users found matching the criteria'
//       });
//     }

//     console.log(`📢 Preparing broadcast to ${allUsers.length} users`);

//     const recipients = allUsers.map(user => ({
//       user: user._id,
//       email: user.email,
//       name: `${user.firstName} ${user.lastName}`,
//       role: user.role,
//       status: 'pending'
//     }));

//     // Create broadcast email record
//     const emailData = {
//       sender: senderId,
//       recipients: recipients,
//       subject,
//       message,
//       messageType: 'text',
//       priority,
//       category,
//       isDraft: false,
//       isBroadcast: true,
//       broadcastFilters: filters,
//       sentAt: new Date(),
//       metadata: {
//         senderRole: sender.role,
//         totalRecipients: recipients.length,
//         recipientRoles: [...new Set(recipients.map(r => r.role)),
//         broadcastType: 'all_users'
//       }
//     };

//     const email = await Email.create(emailData);

//     // Send emails (in production, you might want to use a queue system)
//     const emailResults = await sendProfessionalEmails(email, recipients, sender, subject, message);
    
//     // Update email status
//     await updateEmailStatus(email._id, emailResults);

//     const successfulSends = emailResults.filter(r => r.status === 'sent').length;
//     const failedSends = emailResults.filter(r => r.status === 'failed').length;

//     res.status(201).json({
//       success: true,
//       message: `Broadcast email sent to ${successfulSends} users successfully${failedSends > 0 ? ` (${failedSends} failed)` : ''}`,
//       data: {
//         emailId: email._id,
//         totalRecipients: recipients.length,
//         successful: successfulSends,
//         failed: failedSends,
//         filters: filters
//       },
//       results: emailResults
//     });

//   } catch (error) {
//     console.error('❌ Broadcast email error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to send broadcast email',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };

// // Update the routes to include broadcast
// router.post('/broadcast', authMiddleware, broadcastEmailController);
 
//      Simple rate limiting
// const emailRateLimit = new Map();

// const checkRateLimit = (userId) => {
//   const now = Date.now();
//   const userLimit = emailRateLimit.get(userId) || { count: 0, lastReset: now };
  
//   // Reset count every hour
//   if (now - userLimit.lastReset > 3600000) {
//     userLimit.count = 0;
//     userLimit.lastReset = now;
//   }
  
//   // Limit to 100 emails per hour
//   if (userLimit.count >= 100) {
//     throw new Error('Email rate limit exceeded. Please try again later.');
//   }
  
//   userLimit.count++;
//   emailRateLimit.set(userId, userLimit);
// };

// // Keep other controller functions (getAllEmailsController, getEmailStatsController, etc.) the same
// // but update them to handle professional features

// module.exports = {
//   sendEmailController,
//   getAllEmailsController,
//   getEmailStatsController,
//   getEmailUsersController,
//   updateEmailController,
//   testEmailController,
//   quickTestController,
//   broadcastEmailController,
//       checkRateLimit
// };





const Email = require('../models/emailSchema');
const User = require('../models/userSchema');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Professional email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Rate limiting configuration
const emailRateLimit = new Map();

const checkRateLimit = (userId) => {
  const now = Date.now();
  const userLimit = emailRateLimit.get(userId) || { count: 0, lastReset: now };
  
  // Reset count every hour
  if (now - userLimit.lastReset > 3600000) {
    userLimit.count = 0;
    userLimit.lastReset = now;
  }
  
  // Limit to 100 emails per hour
  if (userLimit.count >= 100) {
    throw new Error('Email rate limit exceeded. Please try again later.');
  }
  
  userLimit.count++;
  emailRateLimit.set(userId, userLimit);
};

// Check if user has permission to send emails
const canSendEmails = (userRole) => {
  const allowedRoles = ['Admin', 'HR', 'Manager', 'Executive'];
  return allowedRoles.includes(userRole);
};

// Professional email templates
const generatePlainTextEmail = (recipient, sender, message) => {
  return `
Alamgir Hossain City Welfare Association
Official Communication

Dear ${recipient.name},

${message}

---
Best regards,
${sender.firstName} ${sender.lastName}
${sender.role}
Alamgir Hossain City Welfare Association
Email: ${sender.email}

This is an official communication from the association.
Please do not reply to this automated message.
  `;
};

const generateHtmlEmail = (recipient, sender, message) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            background: #f5f5f5;
            padding: 20px;
        }
        .email-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
        }
        .content { padding: 30px; }
        .message-content { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #667eea;
            margin: 20px 0; 
        }
        .signature {
            border-top: 1px solid #e9ecef;
            padding-top: 20px;
            margin-top: 30px;
        }
        .footer { 
            background: #2c3e50; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">
                Alamgir Hossain City Welfare Association
            </div>
            <div>Official Communication</div>
        </div>
        
        <div class="content">
            <div style="font-size: 16px; margin-bottom: 20px;">
                <strong>Dear ${recipient.name},</strong>
            </div>
            
            <div class="message-content">
                <div style="white-space: pre-line; font-size: 14px; line-height: 1.6;">
                    ${message}
                </div>
            </div>
            
            <div class="signature">
                <p>
                    <strong>Best regards,</strong><br>
                    <strong>${sender.firstName} ${sender.lastName}</strong><br>
                    <em>${sender.role}</em><br>
                    Alamgir Hossain City Welfare Association<br>
                    <a href="mailto:${sender.email}" style="color: #667eea;">${sender.email}</a>
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>
                <strong>Alamgir Hossain City Welfare Association</strong><br>
                This is an automated official communication.<br>
                Please do not reply to this message.
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// Send professional emails
const sendProfessionalEmails = async (recipients, sender, subject, message) => {
  const results = [];
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email credentials not configured');
    for (const recipient of recipients) {
      results.push({
        email: recipient.email,
        name: recipient.name,
        status: 'failed',
        error: 'Email service not configured'
      });
    }
    return results;
  }

  const transporter = createTransporter();

  for (const recipient of recipients) {
    try {
      const mailOptions = {
        from: {
          name: `${sender.firstName} ${sender.lastName} - Alamgir Hossain City Welfare Association`,
          address: process.env.EMAIL_USER
        },
        to: recipient.email,
        subject: subject,
        text: generatePlainTextEmail(recipient, sender, message),
        html: generateHtmlEmail(recipient, sender, message)
      };

      console.log(`📤 Sending email to: ${recipient.name} <${recipient.email}>`);
      
      const result = await transporter.sendMail(mailOptions);
      
      console.log(`✅ Email delivered to ${recipient.email}`);
      
      results.push({
        email: recipient.email,
        name: recipient.name,
        status: 'sent',
        messageId: result.messageId
      });

    } catch (error) {
      console.error(`❌ Failed to send to ${recipient.email}:`, error.message);
      
      results.push({
        email: recipient.email,
        name: recipient.name,
        status: 'failed',
        error: error.message
      });
    }
  }

  return results;
};

// Update email status
const updateEmailStatus = async (emailId, results) => {
  try {
    for (const result of results) {
      await Email.updateOne(
        { _id: emailId, 'recipients.email': result.email },
        { 
          $set: { 
            'recipients.$.status': result.status,
            'recipients.$.sentAt': result.status === 'sent' ? new Date() : null,
            'recipients.$.error': result.error || null
          } 
        }
      );
    }
    
    const failedCount = results.filter(r => r.status === 'failed').length;
    let overallStatus = 'sent';
    
    if (failedCount === results.length) {
      overallStatus = 'failed';
    } else if (failedCount > 0) {
      overallStatus = 'partial';
    }
    
    await Email.updateOne(
      { _id: emailId },
      { $set: { status: overallStatus } }
    );
    
  } catch (error) {
    console.error('Error updating email status:', error);
  }
};

// @desc    Send email to multiple users
// @route   POST /api/v1/email/send
// @access  Private (Admin/HR/Manager/Executive)
const sendEmailController = async (req, res) => {
  try {
    const { 
      recipientIds, 
      subject, 
      message, 
      priority = 'medium',
      category = 'notification',
      isDraft = false 
    } = req.body;

    const senderId = req.user.userId;

    // Check permissions
    if (!canSendEmails(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to send emails'
      });
    }

    // Validate input
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }

    if (!recipientIds || recipientIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one recipient is required'
      });
    }

    // Check rate limit
    checkRateLimit(senderId);

    // Get sender info
    const sender = await User.findById(senderId).select('firstName lastName email role');
    if (!sender) {
      return res.status(404).json({
        success: false,
        message: 'Sender not found'
      });
    }

    // Get recipients
    const users = await User.find({ 
      _id: { $in: recipientIds },
      isActive: true 
    }).select('email firstName lastName role');

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid recipients found'
      });
    }

    const recipients = users.map(user => ({
      user: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      status: isDraft ? 'draft' : 'pending'
    }));

    // Create email record
    const emailData = {
      sender: senderId,
      recipients: recipients,
      subject,
      message,
      priority,
      category,
      isDraft,
      sentAt: isDraft ? null : new Date()
    };

    const email = await Email.create(emailData);

    // Send emails if not draft
    let emailResults = [];
    if (!isDraft) {
      emailResults = await sendProfessionalEmails(recipients, sender, subject, message);
      await updateEmailStatus(email._id, emailResults);
    }

    // Populate response
    const populatedEmail = await Email.findById(email._id)
      .populate('sender', 'firstName lastName email role')
      .populate('recipients.user', 'firstName lastName email role');

    const successfulSends = emailResults.filter(r => r.status === 'sent').length;
    const failedSends = emailResults.filter(r => r.status === 'failed').length;

    res.status(201).json({
      success: true,
      message: isDraft ? 'Email saved as draft' : `Email sent to ${successfulSends} recipients${failedSends > 0 ? ` (${failedSends} failed)` : ''}`,
      data: populatedEmail,
      summary: {
        totalRecipients: recipients.length,
        sent: successfulSends,
        failed: failedSends
      }
    });

  } catch (error) {
    console.error('Send email error:', error);
    
    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get users for email
// @route   GET /api/v1/email/users
// @access  Private
const getEmailUsersController = async (req, res) => {
  try {
    const { search, role } = req.query;
    const currentUserId = req.user.userId;

    let query = { 
      _id: { $ne: new mongoose.Types.ObjectId(currentUserId) },
      isActive: true 
    };
    
    if (role) {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('firstName lastName email role profilePhoto membershipId')
      .sort({ firstName: 1, lastName: 1 })
      .limit(50)
      .lean();

    res.status(200).json({
      success: true,
      data: users,
      total: users.length
    });

  } catch (error) {
    console.error('Get email users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

// Keep other controller functions (they remain the same)
const getAllEmailsController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      folder = 'inbox', // inbox, sent, draft, important
      search
    } = req.query;

    const userId = req.user.userId;
    let query = {};

    console.log('📥 Fetching emails:', { userId, folder, search });

    // Folder-based filtering
    switch (folder) {
      case 'inbox':
        query = { 
          'recipients.user': new mongoose.Types.ObjectId(userId),
          isDraft: false 
        };
        break;
      case 'sent':
        query = { 
          sender: new mongoose.Types.ObjectId(userId),
          isDraft: false 
        };
        break;
      case 'draft':
        query = { 
          sender: new mongoose.Types.ObjectId(userId),
          isDraft: true 
        };
        break;
      case 'important':
        query = { 
          $or: [
            { 'recipients.user': new mongoose.Types.ObjectId(userId) },
            { sender: new mongoose.Types.ObjectId(userId) }
          ],
          isImportant: true,
          isDraft: false
        };
        break;
      default:
        query = { 
          'recipients.user': new mongoose.Types.ObjectId(userId),
          isDraft: false 
        };
    }

    // Search filter
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const emails = await Email.find(query)
      .populate('sender', 'firstName lastName email profilePhoto role')
      .populate('recipients.user', 'firstName lastName email profilePhoto role')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    const total = await Email.countDocuments(query);

    console.log(`✅ Found ${emails.length} emails for user ${userId}`);

    res.status(200).json({
      success: true,
      data: emails,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Get emails error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emails',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getEmailStatsController = async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log('📊 Fetching email stats for user:', userId);

    // Using Promise.all for better performance
    const [inbox, sent, drafts, important] = await Promise.all([
      // Inbox count
      Email.countDocuments({ 
        'recipients.user': new mongoose.Types.ObjectId(userId),
        isDraft: false 
      }),
      // Sent count
      Email.countDocuments({ 
        sender: new mongoose.Types.ObjectId(userId),
        isDraft: false 
      }),
      // Drafts count
      Email.countDocuments({ 
        sender: new mongoose.Types.ObjectId(userId),
        isDraft: true 
      }),
      // Important count
      Email.countDocuments({ 
        $or: [
          { 'recipients.user': new mongoose.Types.ObjectId(userId) },
          { sender: new mongoose.Types.ObjectId(userId) }
        ],
        isImportant: true,
        isDraft: false
      })
    ]);

    const stats = {
      inbox,
      sent,
      drafts,
      important,
      total: inbox + sent + drafts
    };

    console.log('✅ Email stats:', stats);

    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('❌ Get email stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const updateEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead, isImportant } = req.body;
    const userId = req.user.userId;

    console.log('✏️ Updating email:', { id, isRead, isImportant });

    const updateData = {};
    if (isRead !== undefined) updateData.isRead = isRead;
    if (isImportant !== undefined) updateData.isImportant = isImportant;

    const email = await Email.findOneAndUpdate(
      { 
        _id: id,
        $or: [
          { sender: new mongoose.Types.ObjectId(userId) },
          { 'recipients.user': new mongoose.Types.ObjectId(userId) }
        ]
      },
      updateData,
      { new: true }
    )
    .populate('sender', 'firstName lastName email profilePhoto role')
    .populate('recipients.user', 'firstName lastName email profilePhoto role');

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email not found or access denied'
      });
    }

    console.log('✅ Email updated successfully:', id);

    res.status(200).json({
      success: true,
      message: 'Email updated successfully',
      data: email
    });

  } catch (error) {
    console.error('❌ Update email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



const quickTestController = async (req, res) => {
  try {
    const senderId = req.user.userId;
    
    // Get sender info
    const sender = await User.findById(senderId).select('firstName lastName email');
    if (!sender) {
      return res.status(404).json({
        success: false,
        message: 'Sender not found'
      });
    }

    // Check email configuration
    const configCheck = {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      emailUser: process.env.EMAIL_USER || 'Not configured',
      nodeEnv: process.env.NODE_ENV || 'development'
    };

    if (!configCheck.hasEmailUser || !configCheck.hasEmailPass) {
      return res.status(400).json({
        success: false,
        message: 'Email configuration incomplete',
        configuration: configCheck,
        instructions: [
          '1. Check your .env file has EMAIL_USER and EMAIL_PASS',
          '2. For Gmail: Enable 2FA and use App Password',
          '3. Restart your server after updating .env'
        ]
      });
    }

    // Test email transporter
    let transporterTest = { success: false, error: null };
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      // Verify transporter configuration
      await transporter.verify();
      transporterTest = { success: true, error: null };
    } catch (transporterError) {
      transporterTest = { success: false, error: transporterError.message };
    }

    res.status(200).json({
      success: transporterTest.success,
      message: transporterTest.success ? 'Email configuration looks good!' : 'Email configuration test failed',
      configuration: configCheck,
      transporterTest: transporterTest,
      nextSteps: transporterTest.success ? [
        'Send a test email to verify delivery',
        'Check spam folder if emails not received'
      ] : [
        'Verify your email credentials',
        'Check if 2FA is enabled for Gmail',
        'Use App Password instead of regular password'
      ]
    });

  } catch (error) {
    console.error('❌ Quick test error:', error);
    res.status(500).json({
      success: false,
      message: 'Quick test failed',
      error: error.message
    });
  }
};

// @desc    Delete single email
// @route   DELETE /api/v1/email/:id
// @access  Private
const deleteEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    console.log('🗑️ Deleting email:', { id, userId });

    // Find the email and verify ownership
    const email = await Email.findOne({
      _id: id,
      $or: [
        { sender: new mongoose.Types.ObjectId(userId) },
        { 'recipients.user': new mongoose.Types.ObjectId(userId) }
      ]
    });

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email not found or access denied'
      });
    }

    // Delete the email
    await Email.findByIdAndDelete(id);

    console.log('✅ Email deleted successfully:', id);

    res.status(200).json({
      success: true,
      message: 'Email deleted successfully'
    });

  } catch (error) {
    console.error('❌ Delete email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Bulk delete emails
// @route   POST /api/v1/email/bulk-delete
// @access  Private
const bulkDeleteEmailsController = async (req, res) => {
  try {
    const { emailIds } = req.body;
    const userId = req.user.userId;

    console.log('🗑️ Bulk deleting emails:', { emailIds, userId });

    if (!emailIds || !Array.isArray(emailIds) || emailIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Email IDs array is required'
      });
    }

    // Verify ownership and delete emails
    const result = await Email.deleteMany({
      _id: { $in: emailIds },
      $or: [
        { sender: new mongoose.Types.ObjectId(userId) },
        { 'recipients.user': new mongoose.Types.ObjectId(userId) }
      ]
    });

    console.log('✅ Bulk delete result:', result);

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} email(s)`,
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('❌ Bulk delete emails error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete emails',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


module.exports = {
  sendEmailController,
  getAllEmailsController,
  getEmailStatsController,
  getEmailUsersController,
  updateEmailController,
  // testEmailController,
  quickTestController,
  deleteEmailController,
  bulkDeleteEmailsController
};


// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//         body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
//         .container { max-width: 600px; margin: 0 auto; }
//         .header { border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-bottom: 20px; }
//         .header h1 { margin: 0; color: #2E7D32; }
//         .header p { margin: 0; font-style: italic; color: #666; }
//         .content { margin-bottom: 30px; }
//         .signature { margin-top: 30px; }
//         .footer { font-size: 0.9em; color: #777; border-top: 1px solid #eee; padding-top: 15px; }
//         .contact-info { margin: 10px 0; }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">
//             <h1>Alamgir Hossain City Welfare Association</h1>
//             <p>Global Communications</p>
//         </div>

//         <div class="content">
//             <p><strong>Dear Mr. Rayan Maroun,</strong></p>
//             <p>I hope this message finds you well.</p>
//             <p>This is a test email to ensure our communication channels are functioning correctly. We look forward to connecting with you soon.</p>
//             <p>Please feel free to reply directly to this email; we are monitoring this inbox for your response.</p>
//         </div>

//         <div class="signature">
//             <p>Best regards,</p>
//             <p><strong>MD. Arbini Tilam</strong><br>
//             Assistant<br>
//             Alamgir Hossain City Welfare Association<br>
//             <a href="mailto:research@md.ucm">research@md.ucm</a>
//             </p>
//         </div>

//         <div class="footer">
//             <div class="contact-info">
//                 <strong>Alamgir Hossain City Welfare Association</strong><br>
//                 Tilam Research & Development<br>
//                 Phone: <a href="tel:+880641499915">+880 641-499-9-1-5</a> | E-mail: <a href="mailto:mhossain@md.ucm">mhossain@md.ucm</a>
//             </div>
//         </div>
//     </div>
// </body>
// </html>