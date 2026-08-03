const express = require('express');
const { body } = require('express-validator');
const { register, login, logout, getMe, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Name is required and must be under 60 characters').notEmpty().isLength({ max: 60 }),
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validate
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
    validate
  ],
  login
);

router.post('/logout', logout);

router.get('/me', protect, getMe);

router.post(
  '/forgot-password',
  [
    body('email', 'Please provide a valid email').isEmail(),
    validate
  ],
  forgotPassword
);

router.put(
  '/reset-password/:token',
  [
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validate
  ],
  resetPassword
);

module.exports = router;
