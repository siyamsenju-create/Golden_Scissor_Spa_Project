const express = require('express');
const {
  createReview,
  getReviews,
  getAllReviewsAdmin,
  moderateReview,
  replyToReview,
  deleteReview
} = require('../controllers/review.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getReviews);

// Authenticated customer submit review
router.post('/', protect, createReview);

// Admin / Staff moderation
router.get('/admin', protect, authorize('admin', 'staff'), getAllReviewsAdmin);
router.put('/:id/moderate', protect, authorize('admin'), moderateReview);
router.put('/:id/reply', protect, authorize('admin', 'staff'), replyToReview);
router.delete('/:id', protect, authorize('admin'), deleteReview);

module.exports = router;
