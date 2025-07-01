const authSchema = require("../dbSchema/authSchema");
const bcrypt = require("bcrypt");
const validEmail = require("../helpers/ValidEmail");
var jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const otpGen = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
});

//localhost:7878/api/v1/auth/registration
async function registrationController(req, res) {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.send("All field is require");
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.send(err);
      } else {
        if (!validEmail(email)) {
          res.send("Invalid Email or Password");
        } else {
          const user = new authSchema({
            name,
            email,
            password: hash,
            role: role,
            OTP: otpGen,
          });
          await user.save();
          const OTP = await authSchema.findOneAndUpdate(
            { email },
            { $set: { OTP: otpGen } },
            { new: true }
          );
          setTimeout(async () => {
            const OTP = await authSchema.findOneAndUpdate(
              { email },
              { $set: { OTP: null } },
              { new: true }
            );
          }, 10000);
          res.status(201).send({
            success: true,
            msg: "Registration is completed",
            data: user,
          });
        }
      }
    });
  }
}

//localhost:7878/api/v1/auth/login
async function loginController(req, res) {
  let { email, password } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        const userInfo = {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        };
        if (userInfo.role == "user") {
          const token = jwt.sign({ userInfo }, process.env.JWT_TOKEN, {
            expiresIn: "1d",
          });
          res.cookie("token", token, {
            httpOnly: true, // Can’t be accessed via JS (for security)
            secure: false,
          });
          res.status(201).send({
            success: true,
            msg: "User login Successful",
            token: token,
            data: userInfo,
          });
        } else {
          const token = jwt.sign({ userInfo }, process.env.JWT_TOKEN, {
            expiresIn: "1h",
          });
          res.cookie("token", token, {
            httpOnly: true, // Can’t be accessed via JS (for security)
            secure: false,
          });
          res.status(201).send({
            success: true,
            msg: "Admin login Successful",
            token: token,
            data: userInfo,
          });
        }
        req.cookie;
      }
    });
  } else {
    res
      .status(404)
      .send({ success: false, msg: "User is not found", data: existingUser });
  }
}

//localhost:7878/api/v1/auth/allUser
async function allauthController(req, res) {
  const existingUsers = await authSchema.find();
  res.send(existingUsers);
}

//localhost:7878/api/v1/auth/otp_Varify
async function otpVarifyController(req, res) {
  let { email, otp } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    if ((existingUser.OTP = otp)) {
      existingUser.isVarify = true;
      await existingUser.save();
      res.send({
        success: true,
        msg: "OTP varify successful",
        data: existingUser,
      });
    } else {
      res.status(500).send("Invalid OTP");
    }
  } else {
    res.status(404).send({ success: false, msg: "User is not found" });
  }
}

//localhost:7878/api/v1/auth/otp_resend
async function resendOtpController(req, res) {
  let { email } = req.body;
  const existingUser = await authSchema.findOne({ email });
  if (existingUser) {
    existingUser.OTP = otpGen;
    await existingUser.save();
    res.status(200).send({
      success: true,
      msg: "Otp resend successfully",
      data: existingUser,
    });
  } else {
    res.status(404).send({ success: false, msg: "User is not found" });
  }
}

module.exports = {
  registrationController,
  loginController,
  allauthController,
  otpVarifyController,
  resendOtpController,
};
