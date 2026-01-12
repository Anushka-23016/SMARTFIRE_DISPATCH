const mongoose = require('mongoose');

const IncidentTypeSchema = new mongoose.Schema({
  type_id: { type: Number, required: true },
  type: { type: String, required: true }, // Example: "Fire", "Chemical Spill"
  recommended_trucks: { type: [String], default: [] }, // Truck types
  recommended_equipment: { type: [String], default: [] } // Equipment names
});

module.exports = mongoose.model('IncidentType', IncidentTypeSchema);
