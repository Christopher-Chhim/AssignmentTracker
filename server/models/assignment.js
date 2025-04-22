const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseName: String,
    title: String,
    dueDate: Date,
    reminderOffset: Number, // in hours
    userId: String, // assuming user system later
});

module.exports = mongoose.model('Assignment', assignmentSchema);

