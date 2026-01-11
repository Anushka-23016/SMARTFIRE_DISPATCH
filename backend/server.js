// backend/server.js
const app = require('./src/app');
const connectDB = require('./src/config/db'); // ✅ correct path to db.js
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
