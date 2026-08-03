const express = require('express');
const { getOffers, createOffer, validateOffer, deleteOffer } = require('../controllers/offer.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getOffers);
router.post('/validate', validateOffer);

// Admin-only management
router.post('/', protect, authorize('admin'), createOffer);
router.delete('/:id', protect, authorize('admin'), deleteOffer);

module.exports = router;
