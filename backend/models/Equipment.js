const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  equipment_name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  available: { type: Number, default: 1 } // Number currently available
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
