

///////////////////bpdb//////////////////////////



var jwt = require('jsonwebtoken');
const userlist = require("../models/userSchema");
 

async function emailverifiedController(req, res){
  try {
    // console.log('ok')
    //  console.log(req.headers.authorization);
    const {authorization} = req.headers;
    var decoded = jwt.verify(authorization, 'Rasel');  
    //console.log(decoded.email )
    const updateUser = await userlist.findOneAndUpdate(
      {email: decoded.email},
      {emailVerified: true},
      {new: true}
    );  
    return res.json({ success: true, user: updateUser });
  } catch (err) {
    return res.status(400).json({ error: "Verification failed" });
  }
}

async function emailVerificationController(req, res) {
  try {
    const { id } = req.params;
    const decoded = jwt.verify(id, "Rasel");

    const updated = await userlist.findOneAndUpdate(
      { email: decoded.email },
      { emailVerified: true, isActive: true, $unset: { token: "" } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found or update failed" });
    }

    return res.redirect("http://localhost:5173/login");
  } catch (err) {
    return res.status(400).json({ error: "Invalid or expired verification link" });
  }
}



module.exports = {emailverifiedController, emailVerificationController};








////////////////////Last Corrected Code//////////////////////


// const jwt = require("jsonwebtoken");
// const userlist = require("../models/userSchema");

// async function emailverifiedController(req, res) {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ error: "No authorization token provided" });
//     }

//     // If token is prefixed with "Bearer ", remove it
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });

//     const updateUser = await userlist.findOneAndUpdate(
//       { email: decoded.email },
//       { emailverified: true },
//       { new: true }
//     );

//     if (!updateUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ success: "Email Verification successfully done" });
//   } catch (error) {
//     console.error("Email verification failed:", error.message);
//     res.status(400).json({ error: "Invalid or expired verification token" });
//   }
// }

// // async function emailVerificationController(req, res) {
// //   try {
// //     const { id } = req.params;
// //     if (!id) return res.status(400).send("Invalid verification link");

// //     const decoded = jwt.verify(id, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
// //     if (!decoded.email) throw new Error("Invalid token payload");

// //     await userlist.findOneAndUpdate(
// //       { email: decoded.email },
// //       { emailverified: true },
// //       // { emailverified: true, $unset: { token: "" } },
// //       { new: true }
// //     );

// //     return res.redirect("http://localhost:5173/login");
// //   } catch (error) {
// //     console.error("Email verification redirect error:", error.message);
// //     res.status(400).send("Invalid or expired verification link");
// //   }
// // }
// // In your backend emailVerificationController.js
// const emailVerificationController = async (req, res) => {
//   try {
//     const { token } = req.params;
    
//     // Verify token and update user
//     const user = await userlist.findOneAndUpdate(
//       { verificationToken: token },
//       { 
//         emailVerified: true,
//         verificationToken: null,
//         isActive: true 
//       },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(400).json({ error: "Invalid or expired verification token" });
//     }

//     // ✅ GENERATE LOGIN TOKEN AFTER VERIFICATION
//     const loginToken = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" }
//     );

//     // ✅ RETURN TOKEN AND USER FOR AUTO-LOGIN
//     res.json({
//       success: "Email verified successfully!",
//       token: loginToken,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         role: user.role,
//         emailVerified: true
//       }
//     });

//   } catch (error) {
//     console.error("Email verification error:", error);
//     res.status(500).json({ error: "Email verification failed" });
//   }
// };

// module.exports = { emailverifiedController, emailVerificationController }; 
