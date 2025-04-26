import React, { useState, useEffect } from 'react';
import API from '../api';

function AssignmentForm({ onAssignmentAdded, editing, cancelEdit }) {
    const [form, setForm] = useState({
      courseName: '',
      title: '',
      dueDate: '',
      reminderOffset: 24,
    });
  
    useEffect(() => {
        if (editing) {
          setForm({
            courseName: editing.courseName,
            title: editing.title,
            dueDate: editing.dueDate.slice(0, 16), // format for input[type=datetime-local]
            reminderOffset: editing.reminderOffset,
          });
        }
      }, [editing]);
  
      const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          if (editing) {
            await API.put(`/assignments/${editing._id}`, form);
            cancelEdit();
          } else {
            await API.post('/assignments', form);
          }
    
          onAssignmentAdded(); // refresh dashboard
          setForm({
            courseName: '',
            title: '',
            dueDate: '',
            reminderOffset: 24,
          });
        } catch (err) {
          console.error('❌ Error saving assignment:', err);
        }
      };
    
      return (
        <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-2">
          <input
            name="courseName"
            placeholder="Course Name"
            value={form.courseName}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1"
          />
          <input
            name="title"
            placeholder="Assignment Title"
            value={form.title}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1"
          />
          <input
            name="dueDate"
            type="datetime-local"
            value={form.dueDate}
            onChange={handleChange}
            required
            className="border rounded px-2 py-1"
          />
          <input
            name="reminderOffset"
            type="number"
            placeholder="Reminder Offset (hrs)"
            value={form.reminderOffset}
            onChange={handleChange}
            min="1"
            required
            className="border rounded px-2 py-1"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
              {editing ? 'Update' : 'Add'} Assignment
            </button>
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      );
    }
    
    export default AssignmentForm;