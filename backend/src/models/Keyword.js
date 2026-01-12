const mongoose = require('mongoose');

const KeywordSchema = new mongoose.Schema({
  keywords: { type: [String], required: true } // Example: ["fire", "smoke", "trap"]
});

module.exports = mongoose.model('Keyword', KeywordSchema);