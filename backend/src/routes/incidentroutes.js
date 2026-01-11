const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Test protected route
router.post('/test', auth, (req, res) => {
  res.json({
    message: 'Auth working. Incident route accessed.'
  });
});

module.exports = router;
