// controller/forgotPasswordController.js
const userList = require("../models/userSchema");
const sendEmail = require("../helpers/sendEmail");
const emailThemplate = require("../helpers/emailThemplate");
const crypto = require('crypto');

// Generate random 6-digit code
const generateResetCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Forgot Password - Send reset code
async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user exists
    const user = await userList.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found with this email" });
    }

    // Generate reset code and expiration time (10 minutes)
    const resetCode = generateResetCode();
    const resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save reset code to user document
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = resetCodeExpires;
    await user.save();

    // Send email with reset code
    const emailSubject = 'Password Reset Code - Association';
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hello ${user.firstName},</p>
        <p>You have requested to reset your password. Use the following code to reset your password:</p>
        <div style="background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${resetCode}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
        <br>
        <p>Best regards,<br>Association Team</p>
      </div>
    `;

    await sendEmail(email, emailSubject, emailTemplate);

    res.json({ 
      success: "Password reset code has been sent to your email",
      expiresIn: "10 minutes"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Server error during password reset" });
  }
}

// Verify Reset Code
async function verifyResetCodeController(req, res) {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const user = await userList.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }

    res.json({ 
      success: "Reset code verified successfully",
      verified: true 
    });

  } catch (error) {
    console.error("Verify reset code error:", error);
    res.status(500).json({ error: "Server error during code verification" });
  }
}

// Reset Password
async function resetPasswordController(req, res) {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: "Email, code, and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Find user with valid reset token
    const user = await userList.findOne({
      email,
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }

    // Hash new password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ 
      success: "Password has been reset successfully" 
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Server error during password reset" });
  }
}

module.exports = {
  forgotPasswordController,
  verifyResetCodeController,
  resetPasswordController
};