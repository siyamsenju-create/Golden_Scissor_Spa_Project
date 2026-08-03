const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    type: {
      type: String,
      required: true,
      enum: ['booking_created', 'booking_confirmed', 'booking_cancelled', 'booking_reminded', 'review_received', 'general']
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
