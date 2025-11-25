const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const refreshTokenController = async (req, res) => {
  try {
    const oldToken = req.headers.authorization?.split(" ")[1];
    
    if (!oldToken) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.decode(oldToken);
    
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    console.log("🔄 Refreshing token for user:", decoded.userId);

    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: "Account is deactivated" });
    }

    const newToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "Rasel",
      { expiresIn: "30d" }
    );

    console.log("✅ Token refreshed with fresh role:", user.role);

    res.json({
      success: true,
      message: "Token refreshed successfully",
      token: newToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        membershipId: user.membershipId,
        committeePosition: user.committeePosition,
      },
    });

  } catch (error) {
    console.error("❌ Token refresh error:", error);
    res.status(500).json({
      success: false,
      message: "Token refresh failed",
    });
  }
};

module.exports = { refreshTokenController };










