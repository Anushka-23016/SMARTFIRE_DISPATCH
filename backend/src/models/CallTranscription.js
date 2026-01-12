const CallTranscriptSchema = new mongoose.Schema({
  call_number: { type: String, required: true },
  audio_url: { type: String },
  transcript: { type: String, default: "" },
  raw_keywords: { type: [String], default: [] },
  standard_entity_mapping: [{
    raw_value: String,
    standard_value: String
  }],
  processed: { type: Boolean, default: false },
  status: { type: String, default: "New" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CallTranscript', CallTranscriptSchema);