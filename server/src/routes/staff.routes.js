const express = require('express');
const { getStaffMembers, getStaffMember, createStaff, updateStaffMember, deleteStaff, updateAvailability } = require('../controllers/staff.controller');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { uploadImage } = require('../config/cloudinary');

const router = express.Router();

router.get('/', getStaffMembers);
router.get('/:id', getStaffMember);

// Staff self-update availability
router.put('/availability/me', protect, authorize('staff', 'admin'), updateAvailability);

// Admin-only staff CRUD
router.post('/', protect, authorize('admin'), uploadImage('staff').single('profileImage'), createStaff);
router.put('/:id', protect, uploadImage('staff').single('profileImage'), updateStaffMember);
router.delete('/:id', protect, authorize('admin'), deleteStaff);

module.exports = router;
