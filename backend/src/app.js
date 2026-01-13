// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

// Database
const connectDB = require("./config/db");

// Routes
const aiDispatch = require("./routes/aiDispatch");

// Models
const User = require("./models/user");
const CallTranscript = require("./models/CallTranscript");
const Keyword = require("./models/Keyword");
const IncidentType = require("./models/IncidentType");
const FireTruck = require("./models/Firetruck");
const Firefighter = require("./models/Firefighter");
const Equipment = require("./models/Equipment");
const OperationHistory = require("./models/OperationHistory");

// ------------------- DB -------------------
connectDB();

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ------------------- Models -------------------
// Uncomment User model for login
//const User = require('./models/user');
// Keep other models commented for now
// const CallTranscript = require('./models/CallTranscript');
// const Keyword = require('./models/Keyword');
 //const IncidentType = require('./models/IncidentType');
// const FireTruck = require('./models/Firetruck');
 //const Firefighter = require('./models/Firefighter');
 //const Equipment = require('./models/Equipment');
//const OperationsHistory = require('./models/OperationsHistory');

// ------------------- Hugging Face Setup -------------------
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL =
  'https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h';

// ------------------- AI ROUTES -------------------
app.use("/api/ai", aiDispatch);

// ------------------- LOGIN -------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
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

// ------------------- EXPORT APP -------------------
module.exports = app;
