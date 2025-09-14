const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const {
  createOrUpdateUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');

// Create or update user (protected)
router.post('/', requireAuth, createOrUpdateUser);

// Get user profile (protected)
router.get('/:userId', requireAuth, getUserProfile);

// Update user profile (protected)
router.put('/:userId', requireAuth, updateUserProfile);

module.exports = router;
