const express = require('express');
const { submitInquiry, requestCallback, getInquiries, updateInquiryStatus } = require('../controllers/contact.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', submitInquiry);
router.post('/callback', requestCallback);

// Admin-only review
router.get('/', protect, authorize('admin'), getInquiries);
router.put('/:id', protect, authorize('admin'), updateInquiryStatus);

module.exports = router;
