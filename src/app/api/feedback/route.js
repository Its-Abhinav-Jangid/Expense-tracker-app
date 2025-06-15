// app/api/send-email/route.js (App Router)
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, message, type } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_GMAIL_USER, // your Gmail address
      pass: process.env.MY_GMAIL_APP_PASSWORD, // app password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Expense Tracker Feedback" <${process.env.MY_GMAIL_USER}>`,
      to: process.env.MY_GMAIL_USER, // your receiving email
      subject: `New ${type} from ${email}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }
}
