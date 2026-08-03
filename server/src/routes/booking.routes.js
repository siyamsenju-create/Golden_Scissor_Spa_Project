const express = require('express');
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

const router = express.Router();

router.get('/slots', getAvailableSlots);

router.use(protect);

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBooking);
router.put('/:id/reschedule', rescheduleBooking);
router.put('/:id/cancel', cancelBooking);

// Status updates - admin/staff only
router.put('/:id/status', authorize('admin', 'staff'), updateBookingStatus);

module.exports = router;
