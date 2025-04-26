import React, { useState } from 'react';
import API from '../api';

function LoginPage({ setToken }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            const token = res.data.token;
            localStorage.setItem('token', token);
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setToken(token);
            setMessage('✅ Login successful!'); 
        } catch (err) {
            setMessage('❌ Login failed: ' + (err.response?.data?.error || 'Unknown error'));
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h2 className="text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
                <input name="email" placeholder="Email" onChange={handleChange} required className="border rounded px-2 py-1" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="border rounded px-2 py-1" />
                <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded" >
                    Login
                </button>
            </form>
            <p className='text-red-500'>{message}</p>
        </div>
    );
}

export default LoginPage;