import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, bookRoom, getBookings } from '../service/ApiService';
import './Home.css';

const Home = () => {
    const userData = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userData);
    const user_id = userDetails?.id;
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [existingBookings, setExistingBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getRooms();
                setRooms(response);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError('Failed to fetch rooms');
            }
        };

        const fetchBookings = async () => {
            try {
                const bookings = await getBookings();
                setExistingBookings(bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings');
            }
        };

        fetchRooms();
        fetchBookings();
    }, []);

    const handleBooking = async () => {
        if (!selectedRoom || !startTime || !endTime) {
            setError('Please fill in all fields');
            return;
        }

        if (new Date(startTime) >= new Date(endTime)) {
            setError('End time must be after start time');
            return;
        }

        const isConflict = existingBookings.some(booking => {
            return (
                booking.room.id === selectedRoom.id &&
                (new Date(startTime) < new Date(booking.endTime) && new Date(endTime) > new Date(booking.startTime))
            );
        });

        if (isConflict) {
            alert('This room is already booked for the selected time.');
            return;
        }

        try {
            await bookRoom({
                user: { id: user_id },
                room: { id: selectedRoom.id },
                startTime,
                endTime
            });
            setSuccess('Room booked successfully');
            setError('');
        } catch (error) {
            console.error('Error booking room:', error);
            setError('Failed to book room');
        }
    };

    const handleViewBookings = () => {
        navigate('/user-bookings');
    };

    return (
        <div className="home-container">
            <div className="home-background"></div>
            <div className="home-overlay"></div>
            <h2>Home</h2>

            <div className="user-details">
                <p><strong>Username:</strong> {userDetails.username}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
            </div>

            <h3>Select Room</h3>
            <div className="room-slots">
                {rooms?.length ? (
                    rooms.map((room) => (
                        <div 
                            key={room.id} 
                            className={`room-slot ${selectedRoom?.id === room.id ? 'selected' : ''}`} 
                            onClick={() => setSelectedRoom(room)}
                        >
                            <h4>{room.roomName}</h4>
                            <p>Capacity: {room.capacity}</p>
                        </div>
                    ))
                ) : (
                    <p>No rooms available</p>
                )}
            </div>
            <h3>Select Time</h3>
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <button onClick={handleBooking}>Book Room</button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <button className="view-bookings-btn" onClick={handleViewBookings}>
                View Your Bookings
            </button>
        </div>
    );
};

export default Home;
