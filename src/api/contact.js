import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Debugging: Log the received data
  console.log("Received data:", { name, email, message });

  const transporter = nodemailer.createTransport({
    server: `gmail`,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MY_APP_EMAIL,
      pass: process.env.MY_APP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: MY_APP_EMAIL,
      to: process.env.MY_EMAIL_RECEIVER,
      replyTo: MY_APP_EMAIL,
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a contact form submission</p>
             <p><strong>Name: </strong> ${name}</p>
             <p><strong>Email: </strong> ${email}</p>
             <p><strong>Message: </strong> ${message}</p>`,
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
