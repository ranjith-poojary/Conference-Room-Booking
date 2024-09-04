import React, { useEffect, useState } from 'react';
import { getBookings } from '../service/ApiService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BookingDetails.css';

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(''); // State for error handling
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsData = await getBookings();
                console.log('Fetched bookings:', bookingsData); // Log fetched data
                setBookings(bookingsData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings. Please try again later.'); // Set error message
            }
        };

        fetchBookings();
    }, []);

    const handleAddBooking = () => {
        navigate('/book'); // Navigate to the booking form page
    };

    return (
        <div className="booking-details-container">
            <h2>Booking Details</h2>
            <button className="add-booking-btn" onClick={handleAddBooking}>
                + Add Booking
            </button>
            {error && <div className="error">{error}</div>} {/* Display error message */}
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>Room Capacity</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>User Name</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.room.roomName}</td>
                                <td>{booking.room.capacity}</td>
                                <td>{new Date(booking.startTime).toLocaleString()}</td>
                                <td>{new Date(booking.endTime).toLocaleString()}</td>
                                <td>{booking.user?.username || 'Unknown User'}</td>
                                <td>{booking.user?.companyName || 'Unknown Company'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No bookings available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingDetails;