



 const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// ✅ Enhanced role authorization middleware
const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ 
         success: false,
         error: "Access denied. User not authenticated.",
        code: "NO_USER"
      });
    }

    // ✅ Use fresh role from database if available, otherwise fallback to token role
    const userRole = req.user.currentRole || req.user.role;   
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
         success: false,
        error: "Access denied: insufficient role",
        required: allowedRoles,
        current: userRole,
        code: "INSUFFICIENT_ROLE"
      });
    }

    next();
  };
};


// Specific role middleware for common use cases
const requireAdmin = authorizeRoles('SuperAdmin', 'Admin');
const requireHR = authorizeRoles('SuperAdmin', 'Admin', 'HR');
const requireManagement = authorizeRoles('SuperAdmin', 'Admin', 'HR', 'Manager');
const requireMember = authorizeRoles('SuperAdmin', 'Admin', 'HR', 'Manager', 'Member');



module.exports = {  authorizeRoles, requireAdmin, requireHR, requireManagement, requireMember };