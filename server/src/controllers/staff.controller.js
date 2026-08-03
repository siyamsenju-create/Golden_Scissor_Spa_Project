const Staff = require('../models/Staff.model');
const User = require('../models/User.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.createStaff = async (req, res, next) => {
  try {
    const { name, email, phone, password, specialties, bio, experience, availability } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User already exists with this email');
    }

    // Create staff user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: 'staff'
    });

    let profileImage = '';
    let profileImagePublicId = '';
    if (req.file) {
      profileImage = req.file.path;
      profileImagePublicId = req.file.filename;
    }

    const parsedSpecialties = typeof specialties === 'string' ? JSON.parse(specialties) : specialties;
    const parsedAvailability = typeof availability === 'string' ? JSON.parse(availability) : availability;

    const staff = await Staff.create({
      userId: user._id,
      specialties: parsedSpecialties || [],
      bio: bio || '',
      experience: Number(experience) || 0,
      availability: parsedAvailability || [],
      profileImage,
      profileImagePublicId
    });

    res.status(201).json(new ApiResponse(201, { user, staff }, 'Staff member created successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getStaffMembers = async (req, res, next) => {
  try {
    const staff = await Staff.find({ isActive: true }).populate({
      path: 'userId',
      select: 'name email phone avatar'
    });

    res.status(200).json(new ApiResponse(200, staff, 'Staff members retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getStaffMember = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id).populate({
      path: 'userId',
      select: 'name email phone avatar'
    });

    if (!staff) {
      throw new ApiError(404, 'Staff member not found');
    }

    res.status(200).json(new ApiResponse(200, staff, 'Staff member retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.updateStaffMember = async (req, res, next) => {
  try {
    let staff = await Staff.findById(req.params.id);
    if (!staff) {
      throw new ApiError(404, 'Staff member not found');
    }

    // Role check: Only admin, or the staff user themselves can edit
    if (req.user.role !== 'admin' && req.user._id.toString() !== staff.userId.toString()) {
      throw new ApiError(403, 'Not authorized to update this profile');
    }

    const fieldsToUpdate = { ...req.body };

    if (req.file) {
      fieldsToUpdate.profileImage = req.file.path;
      fieldsToUpdate.profileImagePublicId = req.file.filename;

      if (staff.profileImagePublicId) {
        const { cloudinary } = require('../config/cloudinary');
        await cloudinary.uploader.destroy(staff.profileImagePublicId);
      }
    }

    if (fieldsToUpdate.specialties && typeof fieldsToUpdate.specialties === 'string') {
      fieldsToUpdate.specialties = JSON.parse(fieldsToUpdate.specialties);
    }
    if (fieldsToUpdate.availability && typeof fieldsToUpdate.availability === 'string') {
      fieldsToUpdate.availability = JSON.parse(fieldsToUpdate.availability);
    }

    staff = await Staff.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    }).populate({
      path: 'userId',
      select: 'name email phone avatar'
    });

    res.status(200).json(new ApiResponse(200, staff, 'Staff member profile updated'));
  } catch (error) {
    next(error);
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      throw new ApiError(404, 'Staff member not found');
    }

    staff.isActive = false;
    await staff.save();

    // Also deactivate the user
    await User.findByIdAndUpdate(staff.userId, { isActive: false });

    res.status(200).json(new ApiResponse(200, {}, 'Staff member deactivated'));
  } catch (error) {
    next(error);
  }
};

exports.updateAvailability = async (req, res, next) => {
  try {
    const staff = await Staff.findOne({ userId: req.user._id });
    if (!staff) {
      throw new ApiError(404, 'Staff profile not found');
    }

    const { availability } = req.body;
    staff.availability = availability;
    await staff.save();

    res.status(200).json(new ApiResponse(200, staff, 'Availability updated successfully'));
  } catch (error) {
    next(error);
  }
};
