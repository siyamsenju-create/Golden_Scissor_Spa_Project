const express = require('express');
const { updateProfile, getWishlist, addToWishlist, removeFromWishlist, getAllUsersAdmin } = require('../controllers/user.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { uploadImage } = require('../config/cloudinary');

const router = express.Router();

router.use(protect);

router.put('/profile', uploadImage('avatars').single('avatar'), updateProfile);
router.get('/wishlist', getWishlist);
router.post('/wishlist/:serviceId', addToWishlist);
router.delete('/wishlist/:serviceId', removeFromWishlist);

// Admin-only customer query list
router.get('/admin/customers', authorize('admin'), getAllUsersAdmin);

module.exports = router;
