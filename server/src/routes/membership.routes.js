const express = require('express');
const {
  getMembershipPlans,
  createMembershipPlan,
  subscribeMembership,
  cancelMembership
} = require('../controllers/membership.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getMembershipPlans);

// Authenticated routes
router.use(protect);
router.post('/subscribe', subscribeMembership);
router.post('/cancel', cancelMembership);

// Admin-only creation
router.post('/', authorize('admin'), createMembershipPlan);

module.exports = router;
