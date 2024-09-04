import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './Components/Landing';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import Register from './Components/Register';
import Booking from './Components/booking';
import AdminSignIn from './Components/AdminSignIn'; // Ensure this path is correct
import AdminDashboard from './Components/AdminDashboard'; // Import the AdminDashboard component
import './App.css';
import UserBookings from './Components/UserBookings';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <Router>
            <Routes>
                {/* Route for the landing page */}
                <Route path="/" element={<Landing />} />

                <Route path="/user-bookings" element={<UserBookings></UserBookings>}></Route>
                
                {/* Route for the user sign-in page */}
                <Route 
                    path="/login" 
                    element={isLoggedIn ? <Navigate to="/home" /> : <SignIn onLogin={() => setIsLoggedIn(true)} />} 
                />
                
                {/* Route for the registration page */}
                <Route path="/register" element={<Register />} />
                
                {/* Route for the admin sign-in page */}
                <Route 
                    path="/admin" 
                    element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminSignIn onLogin={() => setIsAdmin(true)} />} 
                />
                
                {/* Route for the home page */}
                <Route 
                    path="/home" 
                    element={<Home></Home>} 
                />

                {/* Route for the booking page */}
                <Route 
                    path="/book" 
                    element={isLoggedIn ? <Booking /> : <Navigate to="/login" />} 
                />
                
                {/* Admin dashboard route */}
                <Route 
                    path="/admin/dashboard" 
                    element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;