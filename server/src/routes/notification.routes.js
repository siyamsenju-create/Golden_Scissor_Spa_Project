const express = require('express');
const { getNotifications, markRead, markAllRead } = require('../controllers/notification.controller');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getNotifications);
router.put('/:id/read', markRead);
router.put('/read-all', markAllRead);

module.exports = router;
