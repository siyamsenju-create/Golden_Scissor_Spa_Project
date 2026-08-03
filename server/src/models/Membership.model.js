const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Membership name is required'],
      unique: true,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    duration: {
      type: Number,
      required: [true, 'Duration in days is required']
    },
    benefits: [{
      type: String,
      required: true
    }],
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Membership', MembershipSchema);
