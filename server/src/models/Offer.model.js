const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Offer description is required']
    },
    discountPercent: {
      type: Number,
      required: [true, 'Discount percentage is required'],
      min: 0,
      max: 100
    },
    code: {
      type: String,
      required: [true, 'Promo code is required'],
      unique: true,
      uppercase: true,
      trim: true
    },
    validUntil: {
      type: Date,
      required: [true, 'Expiration date is required']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    targetServices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offer', OfferSchema);
