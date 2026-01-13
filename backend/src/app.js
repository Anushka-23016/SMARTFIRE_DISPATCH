// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

// Database
const connectDB = require("./config/db");



// Models
const User = require("./model/user");
const CallTranscript = require("./model/CallTranscript");
const Keyword = require("./model/Keyword");
const IncidentType = require("./model/IncidentType");
const FireTruck = require("./model/FireTruck");
const Firefighter = require("./model/Firefighter");
const Equipment = require("./model/Equipment");
const OperationsHistory = require("./model/OperationsHistory");

// ------------------- DB -------------------
connectDB();

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);


// ------------------- Hugging Face Setup -------------------
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
const HUGGING_FACE_API_URL =
  'https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h';

// ------------------- AI ROUTES -------------------
// Routes
const aiDispatchRouter = require("./routes/aiDispatch");
app.use("/api/ai", aiDispatchRouter);
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
