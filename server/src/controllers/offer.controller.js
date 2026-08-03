const Offer = require('../models/Offer.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.createOffer = async (req, res, next) => {
  try {
    const { title, description, discountPercent, code, validUntil, targetServices } = req.body;

    const existingOffer = await Offer.findOne({ code: code.toUpperCase() });
    if (existingOffer) {
      throw new ApiError(400, 'Offer code already exists');
    }

    const offer = await Offer.create({
      title,
      description,
      discountPercent,
      code: code.toUpperCase(),
      validUntil,
      targetServices: targetServices || []
    });

    res.status(201).json(new ApiResponse(201, offer, 'Offer created successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({ isActive: true, validUntil: { $gt: new Date() } })
      .populate('targetServices', 'name price');
    res.status(200).json(new ApiResponse(200, offers, 'Active offers retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.validateOffer = async (req, res, next) => {
  try {
    const { code } = req.body;
    const offer = await Offer.findOne({ code: code.toUpperCase(), isActive: true });

    if (!offer) {
      throw new ApiError(404, 'Promo code not found or inactive');
    }

    if (new Date(offer.validUntil) < new Date()) {
      throw new ApiError(400, 'Promo code has expired');
    }

    res.status(200).json(new ApiResponse(200, offer, 'Promo code validated successfully'));
  } catch (error) {
    next(error);
  }
};

exports.deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      throw new ApiError(404, 'Offer not found');
    }

    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, {}, 'Offer deleted successfully'));
  } catch (error) {
    next(error);
  }
};
