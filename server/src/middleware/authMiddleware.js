const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const User = require('../models/User.model');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this resource');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, 'User associated with this token no longer exists');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'User account has been deactivated');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
