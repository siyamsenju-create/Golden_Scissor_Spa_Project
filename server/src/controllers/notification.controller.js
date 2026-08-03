const Notification = require('../models/Notification.model');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort('-createdAt')
      .limit(50);

    res.status(200).json(new ApiResponse(200, notifications, 'Notifications fetched'));
  } catch (error) {
    next(error);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    if (notification.userId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized');
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(new ApiResponse(200, notification, 'Notification marked as read'));
  } catch (error) {
    next(error);
  }
};

exports.markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
    res.status(200).json(new ApiResponse(200, {}, 'All notifications marked as read'));
  } catch (error) {
    next(error);
  }
};
