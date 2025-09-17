const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendTestMail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // <– allow self-signed certs
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "atharvanebhani9@gmail.com", // send to yourself first
      subject: "Test Email",
      text: "If you see this, Gmail setup works!",
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

sendTestMail();
