import React, { useEffect, useState } from 'react';
import API from '../api';
import AssignmentForm from '../components/AssignmentForm';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Dashboard() {
    const [assignments, setAssignments] = useState([]);
    const [editing, setEditing] = useState(null);

    const fetchAssignments = async () => {
        try {
            const res = await API.get('/assignments');
            setAssignments(res.data);
        } catch (err) {
            console.error('❌ Error fetching assignments:', err);
        }
    };

    const handleDelete = async (id) => {
        await API.delete(`/assignments/${id}`);
        fetchAssignments();
    };

    const cancelEdit = () => setEditing(null);
    
    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div>
            <h2 className='text-xl font-bold'>Your Assignments</h2>
            <AssignmentForm 
                onAssignmentAdded={fetchAssignments}
                editing={editing}
                cancelEdit={cancelEdit}
                />

    <Calendar
        tileContent={({ date, view }) => {
            if (view === 'month') {
                const dayAssignments = assignments.filter(a =>
                    new Date(a.dueDate).toDateString() === date.toDateString()
                );  
                return dayAssignments.map(a => (
                    <p key={a._id}>📌 {a.title}</p>
                ));
            }
        }}
    />
            <ul className="mt-4">
                {assignments.map((a) => (
                    <li key={a._id} className="mb-2">
                        <strong>{a.title}</strong> ({a.courseName}) - due {new Date(a.dueDate).toLocaleString()}
                        <button onClick={() => handleDelete(a._id)} className="ml-2 text-red-600">🗑️</button>
                        <button onClick={() => setEditing(a)} className="ml-2 text-blue-600">✏️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;