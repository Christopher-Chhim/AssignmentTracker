import React, { useState } from 'react';
import API from '../api';

function AssignmentForm({ onAssignmentAdded }) {
  const [form, setForm] = useState({
    courseName: '',
    title: '',
    dueDate: '',
    reminderOffset: 24, // default to 24 hours before
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/assignments', form);
      onAssignmentAdded(); // refresh dashboard
      setForm({ courseName: '', title: '', dueDate: '', reminderOffset: 24 });
    } catch (err) {
      console.error('❌ Failed to add assignment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="courseName" placeholder="Course Name" value={form.courseName} onChange={handleChange} required />
      <input name="title" placeholder="Assignment Title" value={form.title} onChange={handleChange} required />
      <input name="dueDate" type="datetime-local" value={form.dueDate} onChange={handleChange} required />
      <input name="reminderOffset" type="number" value={form.reminderOffset} onChange={handleChange} min="1" required />
      <button type="submit">Add Assignment</button>
    </form>
  );
}

export default AssignmentForm;
