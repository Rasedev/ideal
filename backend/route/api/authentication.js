

// const express = require("express");
// const router = express.Router();

// const registrationController = require("../../controller/registrationController");
// const { emailverifiedController, emailVerificationController } = require("../../controller/emailverifiedController");
// const loginController = require("../../controller/loginController");
// const { refreshTokenController } = require("../../controller/refreshTokenController");
// const { 
//   forgotPasswordController, 
//   verifyResetCodeController, 
//   resetPasswordController 
// } = require("../../controller/forgotPasswordController");

// // Existing routes
// router.post("/registration", registrationController);
// router.post("/emailverified", emailverifiedController);
// router.post("/login", loginController);
// router.get("/emailverification/:id", emailVerificationController);

// // Password reset routes
// router.post('/forgot-password', forgotPasswordController);
// router.post('/verify-reset-code', verifyResetCodeController);
// router.post('/reset-password', resetPasswordController);
// // Add this route
// router.post("/refresh-token", refreshTokenController);

// module.exports = router;







const express = require("express");
const router = express.Router();
const {registrationController }= require("../../controller/registrationController");
const { emailverifiedController, emailVerificationController } = require("../../controller/emailverifiedController");
const loginController = require("../../controller/loginController");
const { forgotPasswordController, verifyResetCodeController, resetPasswordController } = require("../../controller/forgotPasswordController");
const { refreshTokenController } = require("../../controller/refreshTokenController"); // ✅ Add this
const authMiddleware = require("../../middleware/authMiddleware");

// Existing routes
router.post("/registration", registrationController);
router.post("/emailverified", emailverifiedController);
router.post("/login", loginController);
router.get("/emailverification/:id", emailVerificationController);

// Password reset routes
router.post('/forgot-password', forgotPasswordController);
router.post('/verify-reset-code', verifyResetCodeController);
router.post('/reset-password', resetPasswordController);

// ✅ Add token refresh route
router.post('/refresh-token', refreshTokenController);

module.exports = router;





