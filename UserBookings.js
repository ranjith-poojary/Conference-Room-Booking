import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, deleteBooking } from '../service/ApiService'; // Import deleteBooking function
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import './UserBookings.css';

const UserBookings = () => {
    const userData = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userData);
    const user_id = userDetails?.id;

    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const [itemsPerPage] = useState(5); // Items per page
    const [showProfile, setShowProfile] = useState(false); // State to toggle profile modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookings();
                const userBookings = response.filter(booking => booking.user && booking.user.id === user_id);
                setBookings(userBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings');
            }
        };
        fetchBookings();
    }, [user_id]);

    // Calculate the bookings to display on the current page
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const handleNavigateHome = () => {
        navigate('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('userDetails');
        navigate('/login');
    };

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id); // Call the deleteBooking API
            setBookings(bookings.filter(booking => booking.id !== id)); // Update state to remove the deleted booking
        } catch (error) {
            console.error('Error deleting booking:', error);
            setError('Failed to delete booking');
        }
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bookings.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Toggle the profile modal
    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div className="home-container">
        <div className="user-bookings">
            <div className="header">
                <h2>Your Bookings</h2>
                <div className="profile-section">
                    <FaUserCircle size={30} onClick={toggleProfile} className="profile-icon" />
                    {showProfile && (
                        <div className="profile-modal">
                            <p><strong>Username:</strong> {userDetails.username}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
</div>
            {error && <div className="error">{error}</div>}
            {currentBookings.length ? (
                <>
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>Room Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th> {/* Added Actions column */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>{booking.room.roomName}</td>
                                    <td>{new Date(booking.startTime).toLocaleString()}</td>
                                    <td>{new Date(booking.endTime).toLocaleString()}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDelete(booking.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={number === currentPage ? 'active' : ''}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <p>No bookings found</p>
            )}
            <div className="button-container">
                <button className="home-btn" onClick={handleNavigateHome}>Go to Home</button>
            </div>
        </div>
    );
};

export default UserBookings;
