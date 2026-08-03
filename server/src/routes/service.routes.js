const express = require('express');
const { getServices, getService, createService, updateService, deleteService } = require('../controllers/service.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { uploadImage } = require('../config/cloudinary');

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);

// Admin-only actions
router.post('/', protect, authorize('admin'), uploadImage('services').single('image'), createService);
router.put('/:id', protect, authorize('admin'), uploadImage('services').single('image'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;


