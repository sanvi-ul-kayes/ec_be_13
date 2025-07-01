const nodemailer = require("nodemailer");

async function sendEmail({ email, OTP }) {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: `your otp is${OTP}`, // HTML body
  });
}

module.exports = sendEmail;
