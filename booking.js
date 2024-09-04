import React, { useEffect, useState } from 'react';
import { bookRoom, getRooms } from '../service/ApiService'; // Adjust the import path as necessary

const Booking = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [userId, setUserId] = useState(''); // Assuming user ID is 1 for demo purposes



    
    useEffect(() => {
        // Fetch rooms from the API when the component mounts
        const fetchRooms = async () => {
            try {
                const response = await getRooms();
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();

        // console.log(user_id +" user is");
        

        const bookingDetails = {
            user: { id: userId}, // Assuming user ID is available
            room: { id: selectedRoomId },
            startTime: startTime,
            endTime: endTime,
        };

        try {
            const response = await bookRoom(bookingDetails);
            alert('Room booked successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error booking room:', error);
            alert('Failed to book room. Please try again.');
        }
    };

    return (
        <div>
            <h2>Book a Conference Room</h2>
            <form onSubmit={handleBooking}>
                <div>
                    <label htmlFor="room">Select Room:</label>
                    <select
                        id="room"
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        required
                    >
                        <option value="">Select a room</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.roomName} (Capacity: {room.capacity})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Book Room</button>
            </form>
        </div>
    );
};

export default Booking;