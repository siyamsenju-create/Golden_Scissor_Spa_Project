const User = require('../models/User.model');
const Service = require('../models/Service.model');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const fieldsToUpdate = { name, phone };

    if (req.file) {
      fieldsToUpdate.avatar = req.file.path;
      fieldsToUpdate.avatarPublicId = req.file.filename;

      const user = await User.findById(req.user._id);
      if (user.avatarPublicId) {
        const { cloudinary } = require('../config/cloudinary');
        await cloudinary.uploader.destroy(user.avatarPublicId);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
      new: true,
      runValidators: true
    }).populate('membershipId');

    res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.status(200).json(new ApiResponse(200, user.wishlist, 'Wishlist fetched successfully'));
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    const user = await User.findById(req.user._id);
    if (user.wishlist.includes(serviceId)) {
      return res.status(200).json(new ApiResponse(200, user.wishlist, 'Service is already in wishlist'));
    }

    user.wishlist.push(serviceId);
    await user.save();

    res.status(200).json(new ApiResponse(200, user.wishlist, 'Service added to wishlist'));
  } catch (error) {
    next(error);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(id => id.toString() !== serviceId);
    await user.save();

    res.status(200).json(new ApiResponse(200, user.wishlist, 'Service removed from wishlist'));
  } catch (error) {
    next(error);
  }
};

exports.getAllUsersAdmin = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'customer' }).populate('membershipId');
    res.status(200).json(new ApiResponse(200, users, 'Customers fetched successfully'));
  } catch (error) {
    next(error);
  }
};
