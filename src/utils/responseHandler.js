const sendResponse = (res, statusCode, status, message, data = null) => {
  const response = {
    status,
    message,
    ...(data && { data })
  };

  res.status(statusCode).json(response);
};

const sendError = (res, statusCode, message, error = null) => {
  const response = {
    status: 'error',
    message,
    ...(error && process.env.NODE_ENV === 'development' && { error })
  };

  res.status(statusCode).json(response);
};

const sendSuccess = (res, message, data = null) => {
  sendResponse(res, 200, 'success', message, data);
};

module.exports = { sendResponse, sendError, sendSuccess };
