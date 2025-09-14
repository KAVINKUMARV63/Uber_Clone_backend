const { supabaseAdmin } = require('../config/database');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const createOrUpdateUser = async (req, res) => {
  try {
    const { clerk_id, email, first_name, last_name, phone_number, profile_image_url } = req.body;

    const userData = {
      clerk_id,
      email,
      first_name,
      last_name,
      phone_number,
      profile_image_url,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert(userData, { onConflict: 'clerk_id' })
      .select();

    if (error) {
      return sendError(res, 400, 'Failed to create/update user', error);
    }

    sendSuccess(res, 'User created/updated successfully', data[0]);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (error) {
      return sendError(res, 404, 'User not found', error);
    }

    sendSuccess(res, 'User profile retrieved', data);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('clerk_id', userId)
      .select();

    if (error) {
      return sendError(res, 400, 'Failed to update user', error);
    }

    sendSuccess(res, 'User updated successfully', data[0]);
  } catch (error) {
    sendError(res, 500, 'Server error', error);
  }
};

module.exports = {
  createOrUpdateUser,
  getUserProfile,
  updateUserProfile
};
