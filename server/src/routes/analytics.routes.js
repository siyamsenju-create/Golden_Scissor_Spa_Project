const express = require('express');
const { getDashboardStats } = require('../controllers/analytics.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

// Admin-only analytics dashboard
router.get('/dashboard', protect, authorize('admin'), getDashboardStats);

module.exports = router;
