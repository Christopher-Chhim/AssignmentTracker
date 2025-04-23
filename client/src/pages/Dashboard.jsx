import React, { useEffect, useState } from 'react';
import API from '../api';
import AssignmentForm from '../components/AssignmentForm';

function Dashboard() {
    const [assignments, setAssignments] = useState([]);

    const fetchAssignments = async () => {
        try {
            const res = await API.get('/assignments');
            setAssignments(res.data);
        } catch (err) {
            console.error('❌ Error fetching assignments:', err);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div>
            <h2>Your Assignments</h2>
            <AssignmentForm onAssignmentAdded={fetchAssignments} />
            <ul>
                {assignments.map((a) => (
                    <li key={a._id}>
                        <strong>{a.title}</strong> ({a.courseName}) - due {new Date(a.dueDate).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;