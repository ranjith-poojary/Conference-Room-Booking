import React, { useState } from 'react';
import { registerUser } from '../service/ApiService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState(''); 
    const [companyEmail, setCompanyEmail] = useState(''); 
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ 
                username, 
                password, 
                email, 
                companyName, 
                companyEmail, 
                phone 
            });
            alert('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Registration failed. Please try again.');
        }
    };
    return (
        <div>
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleRegister}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" required /> {/* New field */}
                <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} placeholder="Company Email" required /> {/* New field */}
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required /> {/* New field */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;