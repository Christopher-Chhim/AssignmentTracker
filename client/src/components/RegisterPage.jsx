import React, { useState } from 'react';
import API from '../api';

function RegisterPage(){
    const [form, setForm] = useState({ email: '', password: ''});
    const [message, setMessage] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            setMessage('✅ Registration successful! You can now log in.');
        } catch (err) {
            setMessage('❌ Registration failed: ' + (err.response?.data.error || 'Unknown error'));
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h2 className='text-2xl font-bold'>Register</h2>
            <form onSubmit={handleSubmit} className= "flex flex-col gap-2 w-64">
                <input name="email" placeholder='Email' onChange={handleChange} required className="border rounded px-2 py-1" />
                <input name="password" placeholder='Password' type="password" onChange={handleChange} required className="border rounded px-2 py-1" />
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                    Register
                </button>
            </form>
            <p className="text-red-500">{message}</p>
        </div>
    );
}

export default RegisterPage;