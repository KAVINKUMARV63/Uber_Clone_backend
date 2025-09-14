const { supabaseAdmin } = require('../config/database');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const createRide = async (req, res) => {
  try {
    const {
      rider_id,
      pickup_latitude,
      pickup_longitude,
      pickup_address,
      dropoff_latitude,
      dropoff_longitude,
      dropoff_address,
      vehicle_type,
      estimated_duration,
      estimated_distance,
      total_fare
    } = req.body;

    const rideData = {
      rider_id,
      pickup_latitude,
      pickup_longitude,
      pickup_address,
      dropoff_latitude,
      dropoff_longitude,
      dropoff_address,
      vehicle_type,
      estimated_duration,
      estimated_distance,
      base_fare: total_fare * 0.7,
      distance_fare: total_fare * 0.2,
      time_fare: total_fare * 0.1,
      surge_multiplier: 1.0,
      total_fare,
      status: 'requested',
      payment_status: 'pending',
      requested_at: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from('rides')
      .insert(rideData)
      .select();

    if (error) {
      return sendError(res, 400, 'Failed to create ride', error);
    }

    sendSuccess(res, 'Ride created successfully', data[0]);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

const getUserRides = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, limit = 10, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from('rides')
      .select('*')
      .eq('rider_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return sendError(res, 400, 'Failed to fetch rides', error);
    }

    sendSuccess(res, 'Rides retrieved successfully', data);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

const getRideById = async (req, res) => {
  try {
    const { rideId } = req.params;

    const { data, error } = await supabaseAdmin
      .from('rides')
      .select('*')
      .eq('id', rideId)
      .single();

    if (error) {
      return sendError(res, 404, 'Ride not found', error);
    }

    sendSuccess(res, 'Ride retrieved successfully', data);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

const updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body;

    const updateData = {
      status,
      updated_at: new Date().toISOString()
    };

    // Add status-specific timestamps
    switch (status) {
      case 'driver_assigned':
        updateData.accepted_at = new Date().toISOString();
        break;
      case 'in_progress':
        updateData.picked_up_at = new Date().toISOString();
        break;
      case 'completed':
        updateData.completed_at = new Date().toISOString();
        break;
      case 'canceled':
        updateData.canceled_at = new Date().toISOString();
        break;
    }

    const { data, error } = await supabaseAdmin
      .from('rides')
      .update(updateData)
      .eq('id', rideId)
      .select();

    if (error) {
      return sendError(res, 400, 'Failed to update ride status', error);
    }

    sendSuccess(res, 'Ride status updated successfully', data[0]);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

module.exports = {
  createRide,
  getUserRides,
  getRideById,
  updateRideStatus
};
