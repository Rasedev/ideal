


///////////////////////bpdb///////////////////////

// const emailThemplate = require("../helpers/emailThemplate");
// const emailValidation = require("../helpers/emailValidation");
// const sendEmail = require("../helpers/sendEmail");
// const userList = require("../models/userSchema");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// async function registrationController(req, res) {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName)
//       return res.json({ error: "Firstname & lastname are required" });

//     if (!email) return res.json({ error: "Email is required" });

//     if (!emailValidation(email))
//       return res.json({ error: "Email is not valid" });

//     const existingEmail = await userList.findOne({ email });
//     if (existingEmail)
//       return res.json({ error: "Email is already in use" });

//     // Hash password (WAIT for bcrypt!)
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create JWT verification token
//     const token = jwt.sign({ email }, "Rasel", { expiresIn: "30d" });

//     // Save new user
//     const newUser = new userList({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       token: token
//     });

//     await newUser.save();

//     // Send verification email
//     await sendEmail(email, "IDEAL", emailThemplate(token));

//     return res.json({ success: true, message: "Registration successful!" });


//   } catch (err) {
//     console.error("Registration error:", err);
//     return res.status(500).json({ error: "Server error. Try again later." });
//   }
// }

// module.exports = { registrationController };


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const emailTemplate = require("../helpers/emailThemplate");
const sendEmail = require("../helpers/sendEmail");
const emailValidation = require("../helpers/emailValidation");

async function registrationController(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName)
      return res.status(400).json({ error: "Firstname & lastname are required" });

    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!emailValidation(email)) return res.status(400).json({ error: "Email is not valid" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email is already in use" });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create verification token
    const token = jwt.sign({ email }, "Rasel", { expiresIn: "1h" });

    // ✅ Save user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken: token,
    });
    await newUser.save();

    // ✅ Send verification email
    await sendEmail(email, "Verify your email", emailTemplate(token));

    return res.status(201).json({
      success: true,
      message: "Registration successful! Please verify your email.",
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Server error during registration." });
  }
}

module.exports = { registrationController };






/////////////Final Version /////////////


// const sendEmail = require("../helpers/sendEmail");
// const User = require("../models/userSchema");
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');
// const emailThemplate = require("../helpers/emailThemplate");

// async function registrationController(req, res) {
//   try {
//     const { 
//       firstName, 
//       lastName, 
//       email, 
//       telephone, 
//       addressOne, 
//       addressTwo, 
//       city, 
//       postCode, 
//       division, 
//       district, 
//       password,
//       role = "Member" // Default role
//     } = req.body;

//     // Validation
//     if (!firstName || !lastName) {
//       return res.status(400).json({ error: "Firstname & lastname are required" });
//     }
    
//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Please provide a valid email address" });
//     }

//     // Check if email exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "Email is already registered" });
//     }

//     // Password validation
//     if (!password || password.length < 6) {
//       return res.status(400).json({ error: "Password must be at least 6 characters long" });
//     }

//     // Role validation
//     const allowedRoles = ["Member", "ExecutiveMember", "PlotOwner", "Employee"];
//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({ error: "Invalid role specified" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // Generate verification token
//     const verificationToken = jwt.sign(
//       { email, purpose: 'email_verification' },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );

//     // Create user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       telephone,
//       addressOne,
//       password: hashedPassword,
//       role,
//       verificationToken,
//       verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
//       // emailVerified: false
//        emailVerified: process.env.NODE_ENV === 'development' ? true : false,
//     });

//     await newUser.save();

//     // Send verification email
//     const emailTemplate = emailThemplate(verificationToken);
//     await sendEmail(email, 'Verify Your Email - Alamgir Hossain City Kallan Samity', emailTemplate);

//     res.status(201).json({
//       success: "Registration successful! Please check your email to verify your account.",
//       userId: newUser._id
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ error: "Internal server error during registration" });
//   }
// }

// module.exports = registrationController;







