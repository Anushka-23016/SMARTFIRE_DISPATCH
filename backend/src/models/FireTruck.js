const mongoose = require('mongoose');

const FireTruckSchema = new mongoose.Schema({
  truck_number: { type: String, required: true },
  type: { type: String, required: true }, // Example: "Ladder", "Water Tanker"
  station_id: { type: Number, required: true },
  available: { type: Boolean, default: true },
  equipment: { type: [String], default: [] }
});

module.exports = mongoose.model('FireTruck', FireTruckSchema);
