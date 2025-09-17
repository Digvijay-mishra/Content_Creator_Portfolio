import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // Gmail App Password (16 chars)
      },
    });

    // Mail to you
    const mailToYou = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: ["atharvanebhani9@gmail.com", "digvijaymishra2122@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailToYou);

    // Confirmation Email to user
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Atharva",
      html: `
        <h2>Thank you for your message!</h2>
        <p>Hi ${name},</p>
        <p>I've received your message and will get back to you soon.</p>
        <p>Your message:</p>
        <div style="background:#f5f5f5;padding:10px;border-radius:5px;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <p>Best regards,<br>Atharva</p>
      `,
    };

    await transporter.sendMail(mailToUser);

    res.status(200).json({ message: "✅ Emails sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
