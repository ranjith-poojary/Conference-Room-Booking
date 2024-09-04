// src/components/AdminSignIn.js

import React, { useState } from 'react';
import { loginAdmin } from '../service/ApiService';

const AdminSignIn = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin({ username, password });
            if (response) {
                onLogin(); // Call the onLogin function to update the login state
            } else {
                setError('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <div>
            <h2>Admin Sign In</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminSignIn;