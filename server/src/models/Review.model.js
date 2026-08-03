const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer ID is required']
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      maxlength: 1000
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    reply: {
      type: String,
      maxlength: 1000
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
