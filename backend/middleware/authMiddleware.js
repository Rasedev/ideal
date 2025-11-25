

/////////////////FIRST//////////



//////////////////////FINAL/////////////////////////

// const jwt = require('jsonwebtoken');
// const User = require('../models/userSchema');

// // Check if user can send emails
// const canSendEmails = (userRole) => {
//   const allowedRoles = ['Admin', 'HR', 'Manager', 'Executive'];
//   return allowedRoles.includes(userRole);
// };

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ 
//         success: false,
//         message: 'No token provided' 
//       });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Find user
//     const user = await User.findById(decoded.userId).select('-password');
//     if (!user) {
//       return res.status(401).json({ 
//         success: false,
//         message: 'User not found' 
//       });
//     }

//     if (!user.isActive) {
//       return res.status(401).json({ 
//         success: false,
//         message: 'Account is inactive' 
//       });
//     }

//     // Set user data
//     req.user = {
//       userId: user._id.toString(),
//       email: user.email,
//       role: user.role,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       canSendEmails: canSendEmails(user.role)
//     };

//     next();
    
//   } catch (error) {
//     console.error('Auth middleware error:', error.message);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ 
//         success: false,
//         message: 'Invalid token' 
//       });
//     }
    
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ 
//         success: false,
//         message: 'Token expired' 
//       });
//     }
    
//     res.status(500).json({ 
//       success: false,
//       message: 'Authentication failed' 
//     });
//   }
// };

// module.exports = authMiddleware;




/////////////////correct version////////////////////////






const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Check if user can send emails
const canSendEmails = (userRole) => {
  const allowedRoles = ['Admin', 'HR', 'Manager', 'Executive'];
  return allowedRoles.includes(userRole);
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user with fresh data
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        success: false,
        message: 'Account is deactivated' 
      });
    }

    if (!user.emailVerified) {
      return res.status(401).json({ 
        success: false,
        message: 'Please verify your email address' 
      });
    }

    // Attach user to request
    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      canSendEmails: canSendEmails(user.role)
    };

    next();
    
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Authentication failed' 
    });
  }
};

module.exports = authMiddleware;

