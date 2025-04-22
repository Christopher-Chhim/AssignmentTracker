const nodemailer = require('nodemailer');
const Assignment = require('../models/Assignment');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendReminderEmail = async (to, Assignment) => {
    const mailOptions = {
        from: `"Assignment Tracker" <${process.env.EMAIL_USER}>`,
        to,
        subject: `⏰ Reminder: ${assignment.title} is due soon!`,
        html: `
        <p>Hey!</p>
        <p>Your assignment <strong>${assignment.title}</strong> for <em>${assignment.courseName}</em> is due on <strong>${new Date(assignment.dueDate).toLocaleString()}</strong>.</p>
        <p>Good luck — you got this! 💪</p>
    `
  };
    
  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to} about ${assignment.title}`);
    } catch (err) {
  console.error(`❌ Failed to send email to ${to}:`, err);
    }
};

module.exports = sendReminderEmail;