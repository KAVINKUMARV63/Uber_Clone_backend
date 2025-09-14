const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const {
  createRide,
  getUserRides,
  getRideById,
  updateRideStatus
} = require('../controllers/rideController');

// Create new ride (protected)
router.post('/', requireAuth, createRide);

// Get user rides (protected)
router.get('/user/:userId', requireAuth, getUserRides);

// Get specific ride (protected)
router.get('/:rideId', requireAuth, getRideById);

// Update ride status (protected)
router.patch('/:rideId/status', requireAuth, updateRideStatus);

module.exports = router;
