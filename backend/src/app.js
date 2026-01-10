const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'SmartFire Dispatch backend running' });
});

module.exports = app;
