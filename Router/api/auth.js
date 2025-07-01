const express = require("express");
const {
  registrationController,
  loginController,
  allauthController,
  otpVarifyController,
  resendOtpController,
} = require("../../controllers/authControllers");
const authMiddleWare = require("../../middleWare/authMiddleWare");
const router = express.Router();

//localhost:7878/api/v1/auth/registration
router.post("/registration", registrationController);

//localhost:7878/api/v1/auth/login
router.post("/login", loginController);

//localhost:7878/api/v1/auth/allUser
router.post("/allUser", allauthController);

//localhost:7878/api/v1/auth/otp_Varify
router.get("/otp_Varify", otpVarifyController);

//localhost:7878/api/v1/auth/otp_resend
router.get("/otp_resend", resendOtpController);

//localhost:7878/api/v1/auth/user
router.post("/user", authMiddleWare, (req, res) => {
  res.send("Admin");
});

module.exports = router;
