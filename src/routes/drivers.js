const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Placeholder for driver routes
router.get('/available', requireAuth, (req, res) => {
  res.json({ message: 'Available drivers endpoint - coming soon' });
});

module.exports = router;
