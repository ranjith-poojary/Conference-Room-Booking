import React, { useEffect, useState } from 'react';
import { getBookings } from '../service/ApiService';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for the current page
    const [itemsPerPage] = useState(5); // Items per page

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsData = await getBookings();
                console.log(bookingsData);
                setBookings(bookingsData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    // Calculate the bookings to display on the current page
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const handleDelete = (bookingId) => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(bookings.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="dashboard-container">
            <div className="admin-dashboard-container">
                <h2>Admin Dashboard</h2>
                <h3>Bookings</h3>
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Room Name</th>
                            <th>Room Capacity</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>User Name</th>
                            <th>Company Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.room.roomName}</td>
                                <td>{booking.room.capacity}</td>
                                <td>{new Date(booking.startTime).toLocaleString()}</td>
                                <td>{new Date(booking.endTime).toLocaleString()}</td>
                                <td>{booking.user?.username || 'Unknown User'}</td>
                                <td>{booking.user?.companyName || 'Unknown Company'}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        Delete
                                    </button>
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
            </div>
        </div>
    );
};

export default AdminDashboard;
