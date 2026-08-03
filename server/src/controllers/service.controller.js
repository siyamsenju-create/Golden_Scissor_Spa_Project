const Service = require('../models/Service.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.createService = async (req, res, next) => {
  try {
    const { name, category, description, duration, price, isFeatured, displayOrder } = req.body;
    let imageUrl = '';
    let imagePublicId = '';

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    const service = await Service.create({
      name,
      category,
      description,
      duration,
      price,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      displayOrder: parseInt(displayOrder, 10) || 0,
      image: imageUrl,
      imagePublicId
    });

    res.status(201).json(new ApiResponse(201, service, 'Service created successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let servicesQuery = Service.find(query);

    if (sort) {
      const sortBy = sort.split(',').join(' ');
      servicesQuery = servicesQuery.sort(sortBy);
    } else {
      servicesQuery = servicesQuery.sort('displayOrder name');
    }

    const services = await servicesQuery;
    res.status(200).json(new ApiResponse(200, services, 'Services retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }
    res.status(200).json(new ApiResponse(200, service, 'Service retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    const fieldsToUpdate = { ...req.body };
    if (req.file) {
      fieldsToUpdate.image = req.file.path;
      fieldsToUpdate.imagePublicId = req.file.filename;

      // Delete old image from cloudinary if exists
      if (service.imagePublicId) {
        const { cloudinary } = require('../config/cloudinary');
        await cloudinary.uploader.destroy(service.imagePublicId);
      }
    }

    service = await Service.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json(new ApiResponse(200, service, 'Service updated successfully'));
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }

    // Set inactive instead of hard deleting (or soft delete)
    service.isActive = false;
    await service.save();

    res.status(200).json(new ApiResponse(200, {}, 'Service soft-deleted successfully'));
  } catch (error) {
    next(error);
  }
};
