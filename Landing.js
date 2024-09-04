import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css'; // Make sure this CSS file only affects the Landing page

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container"> {/* Updated class name */}
            <h2 className="landing-header">Conference Room Booking</h2>
            <div className="button-container">
                <button className="button sign-up" onClick={() => navigate('/login')}>Login</button>
                <button className="button sign-in" onClick={() => navigate('/register')}>Register</button>
                <button className="button admin" onClick={() => navigate('/admin')}>Admin</button>
            </div>
        </div>
    );
};

export default Landing;
