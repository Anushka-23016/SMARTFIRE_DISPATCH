const express = require('express');
const connectDB = require('./config/db'); // assuming your db.js is in config
const incidentsRouter = require('./routes/incidentRoutes');

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const incidentRoutes = require('./routes/incidentRoutes');

app.use('/api/incidents', incidentRoutes);

// Test route
app.get('/health', (req, res) => {
  res.json({ status: 'SmartFire Dispatch Backend running' });
});

module.exports = app;

