const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new assignment
router.post('/', async (req, res) => {
  const { courseName, title, dueDate, reminderOffset, userId } = req.body;
  const newAssignment = new Assignment({
    courseName,
    title,
    dueDate,
    reminderOffset,
    userId,
  });

  try {
    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
