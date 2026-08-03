const ApiError = require('../utils/apiError');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `User role '${req.user ? req.user.role : 'anonymous'}' is not authorized to access this resource`
        )
      );
    }
    next();
  };
};

module.exports = authorize;
