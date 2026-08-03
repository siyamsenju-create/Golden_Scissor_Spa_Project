const express = require('express');
const { getGalleryItems, createGalleryItem, deleteGalleryItem } = require('../controllers/gallery.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { uploadImage } = require('../config/cloudinary');

const router = express.Router();

router.get('/', getGalleryItems);

// Admin-only CRUD
router.post('/', protect, authorize('admin'), uploadImage('gallery').single('image'), createGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
