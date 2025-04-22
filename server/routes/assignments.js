const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const auth = require('../middleware/auth'); // ⬅️ import auth middleware

// 🔐 Apply auth middleware to all routes in this file
router.use(auth);

// 📥 Create a new assignment
router.post('/', async (req, res) => {
  const { courseName, title, dueDate, reminderOffset } = req.body;

  try {
    const newAssignment = new Assignment({
      courseName,
      title,
      dueDate,
      reminderOffset,
      userId: req.userId, // ⬅️ comes from decoded JWT
    });

    const saved = await newAssignment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📤 Get all assignments for the logged-in user
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find({ userId: req.userId }).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Update an assignment
router.put('/:id', async (req, res) => {
  const { courseName, title, dueDate, reminderOffset } = req.body;

  try {
    const updated = await Assignment.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // ⬅️ make sure it's owned by the user
      { courseName, title, dueDate, reminderOffset },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Assignment not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🗑️ Delete an assignment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Assignment.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: 'Assignment not found' });

    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
