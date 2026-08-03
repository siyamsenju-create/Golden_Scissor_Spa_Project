const Review = require('../models/Review.model');
const Booking = require('../models/Booking.model');
const Service = require('../models/Service.model');
const Staff = require('../models/Staff.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.createReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const customerId = req.user._id;

    // Verify booking exists and belongs to customer
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (booking.customerId.toString() !== customerId.toString()) {
      throw new ApiError(403, 'You can only review bookings you have purchased');
    }

    // Prevent duplicate reviews for same booking
    const existingReview = await Review.findOne({
      customerId,
      staffId: booking.staffId,
      serviceId: booking.serviceId
    });
    if (existingReview) {
      throw new ApiError(400, 'You have already reviewed this service/stylist session');
    }

    const review = await Review.create({
      customerId,
      staffId: booking.staffId,
      serviceId: booking.serviceId,
      rating,
      comment
    });

    res.status(201).json(new ApiResponse(201, review, 'Review submitted successfully. Pending moderation.'));
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const query = { isApproved: true };

    const reviews = await Review.find(query)
      .populate('customerId', 'name avatar')
      .populate('serviceId', 'name')
      .populate({
        path: 'staffId',
        populate: { path: 'userId', select: 'name' }
      })
      .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, reviews, 'Reviews retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getAllReviewsAdmin = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('customerId', 'name email')
      .populate('serviceId', 'name')
      .populate({
        path: 'staffId',
        populate: { path: 'userId', select: 'name' }
      })
      .sort('-createdAt');

    res.status(200).json(new ApiResponse(200, reviews, 'All reviews retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.moderateReview = async (req, res, next) => {
  try {
    const { isApproved } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      throw new ApiError(404, 'Review not found');
    }

    review.isApproved = isApproved;
    await review.save();

    // If approved, update ratings for associated Service & Staff
    if (isApproved) {
      if (review.serviceId) {
        const serviceReviews = await Review.find({ serviceId: review.serviceId, isApproved: true });
        const avg = serviceReviews.reduce((sum, r) => sum + r.rating, 0) / serviceReviews.length;
        await Service.findByIdAndUpdate(review.serviceId, {
          rating: parseFloat(avg.toFixed(1)),
          totalReviews: serviceReviews.length
        });
      }

      if (review.staffId) {
        const staffReviews = await Review.find({ staffId: review.staffId, isApproved: true });
        const avg = staffReviews.reduce((sum, r) => sum + r.rating, 0) / staffReviews.length;
        await Staff.findByIdAndUpdate(review.staffId, {
          rating: parseFloat(avg.toFixed(1)),
          totalReviews: staffReviews.length
        });
      }
    }

    res.status(200).json(new ApiResponse(200, review, `Review approved status set to ${isApproved}`));
  } catch (error) {
    next(error);
  }
};

exports.replyToReview = async (req, res, next) => {
  try {
    const { reply } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      throw new ApiError(404, 'Review not found');
    }

    review.reply = reply;
    await review.save();

    res.status(200).json(new ApiResponse(200, review, 'Reply added to review'));
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, {}, 'Review deleted successfully'));
  } catch (error) {
    next(error);
  }
};
