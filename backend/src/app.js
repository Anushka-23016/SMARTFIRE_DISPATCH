// app.js
require('dotenv').config();          // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection

// Connect to MongoDB
connectDB();

const app = express();

// ------------------- MIDDLEWARE -------------------

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for your frontend only
app.use(cors({
  origin: "http://localhost:5174", // <-- your frontend URL
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Removed invalid wildcard app.options("*")

// ------------------- Models -------------------
// Uncomment User model for login
const User = require('./models/user');
// Keep other models commented for now
 const CallTranscript = require('./models/CallTranscript');
 const Keyword = require('./models/Keyword');
 const IncidentType = require('./models/IncidentType');
 const FireTruck = require('./models/FireTruck');
 const Firefighter = require('./models/Firefighter');
 const Equipment = require('./models/Equipment');
const OperationsHistory = require('./models/OperationsHistory');

// ------------------- Hugging Face Setup -------------------
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL =
  'https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h';

// ------------------- Routes -------------------

// Test route
app.get('/test', (req, res) => {
  res.json({ message: "Server is running and DB connected!" });
});

// ------------------- LOGIN -------------------
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body; // username input from frontend

  try {
    // Map frontend username input to email in DB
    const user = await User.findOne({ email: username });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Wrong password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------- CALL PROCESSING -------------------
// ... your existing call processing code stays unchanged

// ------------------- EXPORT APP -------------------
// ✅ Do NOT start the server here; server.js handles it
module.exports = app;
