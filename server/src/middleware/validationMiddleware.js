const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path || err.param]: err.msg }));
    return next(new ApiError(400, 'Validation failed', extractedErrors));
  }
  next();
};

module.exports = validate;
