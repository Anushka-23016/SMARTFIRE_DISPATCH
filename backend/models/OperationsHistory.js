const mongoose = require('mongoose');

const OperationsHistorySchema = new mongoose.Schema({
  call_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CallTranscript', required: true },
  incident_type_id: { type: Number, required: true },
  standard_entities: { type: [String], default: [] },
  assigned_trucks: { type: [String], default: [] },
  assigned_personnel: { type: [String], default: [] },
  assigned_equipment: { type: [String], default: [] },
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date },
  status: { type: String, default: "Ongoing" }
});

module.exports = mongoose.model('OperationsHistory', OperationsHistorySchema);
