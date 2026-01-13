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

// ------------------- TEST ROUTE -------------------
app.get("/test", async (req, res) => {
  try {
    const data = await IncidentType.findOne();

    res.json({
      message: "Server is running ✅",
      db: "Connected ✅",
      sampleData: data || "No documents yet"
    });
  } catch (err) {
    res.status(500).json({
      message: "Server is running ✅",
      db: "Connection failed ❌",
      error: err.message
    });
  }
});

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
