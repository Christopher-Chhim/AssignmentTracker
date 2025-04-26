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
        <div className="max-w-3xl mx-auto p-4">
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>Your Assignments</h2>
                <button 
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}
                    className='bg-red-500 text-white px-3 py-1 rounded'
                    >
                        Logout
                        </button>
                    </div> 

            <AssignmentForm 
                onAssignmentAdded={fetchAssignments}
                editing={editing}
                cancelEdit={cancelEdit}
            />

    <Calendar
        className='mb-6'
        tileContent={({ date, view }) => {
            if (view === 'month') {
                const dayAssignments = assignments.filter(a =>
                    new Date(a.dueDate).toDateString() === date.toDateString()
                );  
                return dayAssignments.map(a => (
                    <p key={a._id} className="text-[10px] truncate">📌 {a.title}</p>
                ));
            }
        }}
    />
            <ul className="space-y-3">
                {assignments.map((a) => (
                    <li key={a._id} className="flex items-center gap-4">
                        <div>
                        <strong>{a.title}</strong> ({a.courseName}) - due {new Date(a.dueDate).toLocaleString()}
                        </div>
                        <button onClick={() => handleDelete(a._id)} className="ml-2 text-red-600">🗑️</button>
                        <button onClick={() => setEditing(a)} className="ml-2 text-blue-600">✏️</button>
                    </li>
                ))}
            </ul>
        </div>        
    );
}

export default Dashboard;