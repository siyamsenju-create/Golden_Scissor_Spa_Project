const ContactInquiry = require('../models/ContactInquiry.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.submitInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      message,
      type: 'general'
    });

    res.status(201).json(new ApiResponse(201, inquiry, 'Inquiry submitted successfully.'));
  } catch (error) {
    next(error);
  }
};

exports.requestCallback = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    const inquiry = await ContactInquiry.create({
      name,
      phone,
      email: 'callback@goldenscissorspa.com', // fallback for schema validation
      message: 'Client requested a callback via the luxury contact portal.',
      type: 'callback'
    });

    res.status(201).json(new ApiResponse(201, inquiry, 'Callback request submitted. Our concierge will contact you shortly.'));
  } catch (error) {
    next(error);
  }
};

exports.getInquiries = async (req, res, next) => {
  try {
    const inquiries = await ContactInquiry.find().sort('-createdAt');
    res.status(200).json(new ApiResponse(200, inquiries, 'Contact inquiries retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await ContactInquiry.findById(req.params.id);

    if (!inquiry) {
      throw new ApiError(404, 'Inquiry not found');
    }

    inquiry.status = status;
    if (status === 'responded') {
      inquiry.respondedAt = new Date();
    }
    await inquiry.save();

    res.status(200).json(new ApiResponse(200, inquiry, `Inquiry status updated to ${status}`));
  } catch (error) {
    next(error);
  }
};
