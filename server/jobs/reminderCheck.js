const cron = require('node-cron');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');
const sendReminderEmail = require('../utils/mailer');

// Function runs every 30 minutes
cron.schedule('*/30 * * * *', async () => {
    console.log('🔁 Running assignment reminder check...');

    const now = new Date();

   try {
    const assignments = await Assignment.find();
    for (let assignment of assignments) {
      const timeLeft = (assignment.dueDate - now) / (1000 * 60 * 60); // in hours
      const shouldNotify = timeLeft <= (assignment.reminderOffset || 1) && timeLeft > 0;

      if (shouldNotify) {
        const user = await User.findById(assignment.userId);
        if (user) {
          await sendReminderEmail(user.email, assignment);
        }
      }
    }
  } catch (err) {
    console.error('❌ Error checking assignments:', err);
  }
});