const express = require('express');
const jwt = require('jsonwebtoken');
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  rescheduleBooking,
  cancelBooking,
  getAvailableSlots
} = require('../controllers/booking.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const User = require('../models/User.model');

const router = express.Router();

// Optional authentication middleware for guest bookings
const optionalProtect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

router.get('/slots', getAvailableSlots);
router.post('/', optionalProtect, createBooking);

router.use(protect);

router.get('/', getBookings);
router.get('/:id', getBooking);
router.put('/:id/reschedule', rescheduleBooking);
router.put('/:id/cancel', cancelBooking);

// Status updates - admin/staff only
router.put('/:id/status', authorize('admin', 'staff'), updateBookingStatus);

module.exports = router;
