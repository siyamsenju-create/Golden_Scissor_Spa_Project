const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, err.errors || [], err.stack);
  }

  // Handle Mongoose duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(error.keyValue).join(', ')}`;
    error = new ApiError(400, message);
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (error.name === 'CastError') {
    const message = `Resource not found with id of ${error.value}`;
    error = new ApiError(404, message);
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token. Please log in again.');
  }

  if (error.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token expired. Please log in again.');
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  };

  res.status(error.statusCode || 500).json(response);
};

module.exports = errorHandler;
