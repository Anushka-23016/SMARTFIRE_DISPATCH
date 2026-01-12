// app.js
require('dotenv').config();          // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const connectDB = require('./config/db'); // MongoDB connection

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());

// Import models
const CallTranscript = require('./models/CallTranscript');


const Equipment = require('./models/Equipment');
const Firefighter = require('./models/Firefighter');
const FireTruck = require('./models/FireTruck');
const IncidentType = require('./models/IncidentType');
const Keyword = require('./models/Keyword');
const OperationsHistory = require('./models/OperationsHistory');


// Hugging Face API setup
 const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h';

// ------------------- Routes -------------------

// Test route to check server and DB
app.get('/test', (req, res) => {
  res.json({ message: "Server is running and DB connected!" });
});

// Route to handle incoming calls
app.post('/call', async (req, res) => {
  const { call_number, audio_url } = req.body;

  try {
    // 1️⃣ Save incoming call in MongoDB
    let call = await CallTranscript.create({ call_number, audio_url });

    // 2️⃣ Send audio to Hugging Face API
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: audio_url },
      { headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` } }
    );

    const transcript = response.data.text || "Transcript not available";

    // 3️⃣ Extract keywords
    let raw_keywords = [];
    const allKeywords = await Keyword.find({});
    allKeywords.forEach(k => {
      k.keywords.forEach(kw => {
        if (transcript.toLowerCase().includes(kw.toLowerCase())) raw_keywords.push(kw);
      });
    });

    // 4️⃣ Map to incident type
    let incidentType = await IncidentType.findOne({ type: { $in: raw_keywords } });
    if (!incidentType) incidentType = await IncidentType.findOne({ type_id: 99 }); // default

    // 5️⃣ Update call transcript with results
    call.transcript = transcript;
    call.raw_keywords = raw_keywords;
    call.standard_entity_mapping = raw_keywords.map(kw => ({
      raw_value: kw,
      standard_value: incidentType.type
    }));
    call.processed = true;
    call.status = "Processing";
    await call.save();

    // 6️⃣ Assign resources
    const trucks = await FireTruck.find({ available: true, type: { $in: incidentType.recommended_trucks } });
    const equipment = await Equipment.find({ available: { $gt: 0 }, equipment_name: { $in: incidentType.recommended_equipment } });
    const personnel = await Firefighter.find({ skills: { $in: ["Rescue"] } }).limit(2);

    // 7️⃣ Save operation history
    const operation = await OperationsHistory.create({
      call_id: call._id,
      incident_type_id: incidentType.type_id,
      standard_entities: [incidentType.type],
      assigned_trucks: trucks.map(t => t.truck_number),
      assigned_personnel: personnel.map(p => p.name),
      assigned_equipment: equipment.map(e => e.equipment_name),
      start_time: new Date(),
      status: "Ongoing"
    });

    // 8️⃣ Send response
    res.json({ message: "Call processed successfully", call, operation });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
