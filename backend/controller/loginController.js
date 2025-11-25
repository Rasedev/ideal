//////////Final Code bpdb//////////

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const emailValidation = require("../helpers/emailValidation");
// const User = require("../models/userSchema");

// // async function loginController(req, res) {
// //   try {
// //     const { email, password } = req.body;
// //     //console.log("Login Request Body:", req.body);
// //     if (!email || !password) {
// //       return res.status(400).json({ success: false, error: "Email and password are required" });
// //     }

// //     if (!emailValidation(email)) {
// //       return res.status(400).json({ success: false, error: "Invalid email format" });
// //     }

// //     const existingUser = await User.findOne({ email }).select("+password");
// //     if (!existingUser) {
// //       return res.status(404).json({ success: false, error: "User not found" });
// //     }

// //     if (!existingUser.emailVerified) {
// //       return res.status(403).json({ success: false, error: "Email not verified" });
// //     }

// //     if (!existingUser.password) {
// //       return res.status(500).json({ success: false, error: "User has no password set." });
// //     }

// //     const isMatch = await bcrypt.compare(password, existingUser.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, error: "Incorrect password" });
// //     }

// //     const token = jwt.sign(
// //       { email: existingUser.email, role: existingUser.role, user: existingUser._id },
// //       "Rasel",
// //       { expiresIn: "7d" }
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       email: existingUser.email,
// //       role: existingUser.role,
// //       token,
// //      // userId: existingUser._id,
// //      user: {
// //     _id: existingUser._id,
// //     email: existingUser.email,
// //     role: existingUser.role,
// //     name: existingUser.name, // Add more fields if needed
// //   },
// //     });
// //   } catch (err) {
// //     console.error("Login Error:", err);
// //     return res.status(500).json({ success: false, error: "Server error during login." });
// //   }
// // }

// async function loginController(req, res) {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, error: "Email and password are required" });
//     }

//     const existingUser = await User.findOne({ email }).select("+password");
//     if (!existingUser) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }
//     // if (!emailValidation(email)) {
//     //    return res.status(400).json({ success: false, error: "Invalid email format" });
//     // }

//     if (!existingUser.emailVerified) {
//       return res.status(403).json({ success: false, error: "Email not verified" });
//     }

//     const isMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       { email: existingUser.email, role: existingUser.role, user: existingUser._id },
//       "Rasel",
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         _id: existingUser._id,
//         email: existingUser.email,
//         role: existingUser.role,
//         name: existingUser.name
//       }
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     return res.status(500).json({ success: false, error: "Server error during login." });
//   }
// }



// module.exports = loginController;



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: "Email and password are required" });

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) return res.status(404).json({ success: false, error: "User not found" });

    if (!existingUser.emailVerified) return res.status(403).json({ success: false, error: "Email not verified" });

    const isMatch =  bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(401).json({ success: false, error: "Incorrect password" });

    const token = jwt.sign(
      { email: existingUser.email, role: existingUser.role, userId: existingUser._id },
      "Rasel",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, error: "Server error during login." });
  }
}

module.exports = loginController;







////////////////Corrected Code////////////////


// const User = require("../models/userSchema");
// const emailValidation = require("../helpers/emailValidation");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// async function loginController(req, res) {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!emailValidation(email) || !password) {
//       return res.status(400).json({ 
//         success: false,
//         error: "Email and password are required" 
//       });
//     }

//     // Find user
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(401).json({ 
//         success: false,
//         error: "Invalid email or password" 
//       });
//     }
// // REMOVE email verification block
//     // Check if user is active 
//     // if (!user.isActive) {
//     //   return res.status(401).json({ 
//     //     success: false,
//     //     error: "Account is deactivated. Please contact administrator." 
//     //   });
//     // }
    
//     //Option 2 — Allow only Admin to login without email verification

//     // Check email verification
//     // if (!user.emailVerified) {
//     //   return res.status(401).json({ 
//     //     success: false,
//     //     error: "Please verify your email before logging in" 
//     //   });
//     // }
//     if (!user.emailVerified && user.role !== "Admin") {
//   return res.status(401).json({
//     success: false,
//     error: "Account not verified. Please check your email."
//   });
// }




//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ 
//         success: false,
//         error: "Invalid email or password" 
//       });
//     }

//     // Update last login
//     user.lastLogin = new Date();
//     user.loginCount += 1;
//     await user.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" }
//     );

//     // Prepare user data for response (exclude sensitive info)
//     const userResponse = {
//       id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//       profilePhoto: user.profilePhoto,
//       phone: user.phone,
//       lastLogin: user.lastLogin,
//       emailVerified: user.emailVerified
//     };

//     res.json({
//       success: true,
//       message: "Login successful",
//       token: token,
//       user: userResponse
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ 
//       success: false,
//       error: "Internal server error during login" 
//     });
//   }
// }

// module.exports = loginController;







