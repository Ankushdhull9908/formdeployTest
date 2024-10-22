// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
console.log("MongoDB URI is: " + mongoURI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model for patient data
const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// Define a POST route to save patient data
app.post('/submit', async (req, res) => {
    const { name, email } = req.body;

    try {
        const newPatient = new Patient({ name, email });
        await newPatient.save();
        res.json({ message: 'Form submitted successfully!', data: { name, email } });
    } catch (error) {
        console.error('Error saving patient data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
