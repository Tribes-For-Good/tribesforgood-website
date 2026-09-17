import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, phone, subject, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // send from your email
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // send to your email (or another if set)
      replyTo: email, // reply goes to the user
      subject: `${name}:${subject}`,
      text: `
      Full Name: ${name}
      Email: ${email}
      Phone Number: ${phone}
      Subject: ${subject}
      Message: ${message}
      `,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}