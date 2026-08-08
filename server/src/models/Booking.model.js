const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone number is required'],
      trim: true
    },
    customerEmail: {
      type: String,
      trim: true
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'Staff ID is required']
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service ID is required']
    },
    date: {
      type: Date,
      required: [true, 'Booking date is required']
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'] // e.g. "11:30 AM"
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    totalAmount: {
      type: Number,
      required: true
    },
    notes: {
      type: String,
      maxlength: 500
    },
    whatsapp: {
      confirmationSent: { type: Boolean, default: false },
      confirmationSentAt: { type: Date },
      reminder24hSent: { type: Boolean, default: false },
      reminder24hSentAt: { type: Date },
      reminder2hSent: { type: Boolean, default: false },
      reminder2hSentAt: { type: Date }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);
