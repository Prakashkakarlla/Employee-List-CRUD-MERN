// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

// Initialize the app
const app = express();
const path = require('path');
// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies if needed
  };
  
  app.use(cors(corsOptions));


// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Change this to your actual database name
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed:', err));

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Employee Management API');
});

// Import routes
const authRoutes = require('./routes/auth'); // Authentication routes
const employeeRoutes = require('./routes/employees'); // Employee routes

// Use routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/employees', employeeRoutes); // Employee management routes


// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/employees', employeeRoutes); 

// Catch all other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
