const express = require('express');
const router = express.Router();
const { sendSuccess } = require('../utils/responseHandler');

// Health check for auth
router.get('/health', (req, res) => {
  sendSuccess(res, 'Auth service is running');
});

// Webhook endpoint for Clerk events
router.post('/webhook', (req, res) => {
  // Handle Clerk webhooks here
  console.log('Webhook received:', req.body);
  res.status(200).json({ received: true });
});

module.exports = router;
