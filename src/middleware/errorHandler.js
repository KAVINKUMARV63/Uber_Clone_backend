const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error response
  let error = {
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.status = 'fail';
    error.statusCode = 400;
  } else if (err.name === 'CastError') {
    error.status = 'fail';
    error.statusCode = 400;
    error.message = 'Invalid data format';
  } else if (err.code === 11000) {
    error.status = 'fail';
    error.statusCode = 400;
    error.message = 'Duplicate field value';
  }

  res.status(error.statusCode || 500).json(error);
};

module.exports = errorHandler;
