import axios from 'axios';

// Set the base URL for axios
const API_URL = 'http://localhost:8080/api'; // Adjust the base URL as necessary

// Function to register a user
export const registerUser = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/users/register`, userData);
        return res.data; // Return the response data
    } catch (error) {
        console.error("There was an error registering the user:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const res = await axios.post(`${API_URL}/users/login`, credentials);
        return res.data; // Return the response data
    } catch (error) {
        console.error("There was an error logging in:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to log in an admin
export const loginAdmin = async (credentials) => {
    try {
        const res = await axios.post(`${API_URL}/admins/login`, credentials);
        return res.data; // Return the response data
    } catch (error) {
        console.error("There was an error logging in:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to get available rooms
export const getRooms = async () => {
    try {
        const res = await axios.get(`${API_URL}/rooms`);
        return res.data; // Return the response data
    } catch (error) {
        console.error("There was an error fetching rooms:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to book a room
export const bookRoom = async (bookingData) => {
    try {
        const res = await axios.post(`${API_URL}/bookings`, bookingData);
        return res.data; // Return the response data
    } catch (error) {
        console.error("There was an error booking the room:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to get all bookings
export const getBookings = async () => {
    try {
        const res = await axios.get(`${API_URL}/bookings`);
        // console.log('Bookings data:', res.data);
        return res.data; // Return the response data
    } catch (error) {
        console.error("There was an error fetching bookings:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to delete a booking
export const deleteBooking = async (bookingId) => {
    try {
        await axios.delete(`${API_URL}/bookings/${bookingId}`);
    } catch (error) {
        console.error("There was an error deleting the booking:", error);
        throw error; // Rethrow the error for handling in the component
    }
};



