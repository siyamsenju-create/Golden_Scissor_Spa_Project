const mongoose = require('mongoose');

const ContactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    type: {
      type: String,
      enum: ['general', 'callback'],
      default: 'general'
    },
    status: {
      type: String,
      enum: ['pending', 'responded', 'ignored'],
      default: 'pending'
    },
    respondedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactInquiry', ContactInquirySchema);
