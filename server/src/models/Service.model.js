const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Signature', 'Artisan', 'Rejuvenation', 'Therapy', 'Wellness', 'Lustre', 'Combo'],
    },
    description: { type: String, required: true, maxlength: 1000 },
    duration: { type: Number, required: true }, // minutes
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Text search index
ServiceSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Service', ServiceSchema);
