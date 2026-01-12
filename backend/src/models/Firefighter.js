const mongoose = require('mongoose');

const FirefighterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], default: [] }, // Example: ["Rescue", "Medical"]
  station_id: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Firefighter', FirefighterSchema);