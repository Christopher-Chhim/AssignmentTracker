const cron = require('node-cron');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');

// Function runs every 30 minutes
cron.schedule('*/30 * * * *', async () => {
    console.log('🔁 Running assignment reminder check...');

    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    try {
        // Find assignments due in the next hour
        const assignments = await Assignment.find({
            dueDate: { $gte: now, $lte: nextHour }
        });

        for (let assignment of assignments) {
            const timeLeft = (assignment.dueDate - now) / (1000 * 60); // in minutes
            console.log(`⏰ Reminder: "${assignment.title}" is due in ${Math.round(timeLeft)} mins for user ${assignment.userId}`);
                  // 🔜 Replace this with real email/push notification later
        }
    } catch (err) {
        console.error('❌ Error checking deadlines:', err);
    }
});