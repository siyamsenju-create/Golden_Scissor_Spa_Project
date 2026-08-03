const Gallery = require('../models/Gallery.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.createGalleryItem = async (req, res, next) => {
  try {
    const { category, caption, displayOrder } = req.body;

    if (!req.file) {
      throw new ApiError(400, 'Please upload an image');
    }

    const item = await Gallery.create({
      image: req.file.path,
      imagePublicId: req.file.filename,
      category,
      caption: caption || '',
      displayOrder: parseInt(displayOrder, 10) || 0
    });

    res.status(201).json(new ApiResponse(201, item, 'Gallery item created successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getGalleryItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = { isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    const items = await Gallery.find(query).sort('displayOrder -createdAt');
    res.status(200).json(new ApiResponse(200, items, 'Gallery items retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      throw new ApiError(404, 'Gallery item not found');
    }

    // Delete image from cloudinary
    if (item.imagePublicId) {
      const { cloudinary } = require('../config/cloudinary');
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json(new ApiResponse(200, {}, 'Gallery item deleted successfully'));
  } catch (error) {
    next(error);
  }
};
