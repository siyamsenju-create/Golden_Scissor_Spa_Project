const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Image URL is required']
    },
    imagePublicId: {
      type: String,
      required: [true, 'Image Public ID is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Haircuts', 'Beard', 'Facial', 'Interior', 'All']
    },
    caption: {
      type: String,
      maxlength: 200
    },
    isActive: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', GallerySchema);
