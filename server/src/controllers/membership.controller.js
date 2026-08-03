const Membership = require('../models/Membership.model');
const User = require('../models/User.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.createMembershipPlan = async (req, res, next) => {
  try {
    const { name, price, duration, benefits, discountPercent } = req.body;

    const plan = await Membership.create({
      name,
      price,
      duration,
      benefits,
      discountPercent
    });

    res.status(201).json(new ApiResponse(201, plan, 'Membership plan created successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getMembershipPlans = async (req, res, next) => {
  try {
    const plans = await Membership.find({ isActive: true });
    res.status(200).json(new ApiResponse(200, plans, 'Membership plans retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.subscribeMembership = async (req, res, next) => {
  try {
    const { planId } = req.body;
    const plan = await Membership.findById(planId);

    if (!plan || !plan.isActive) {
      throw new ApiError(404, 'Selected plan is not available');
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.duration);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        membershipId: plan._id,
        membershipExpiry: expiryDate
      },
      { new: true }
    ).populate('membershipId');

    res.status(200).json(new ApiResponse(200, user, 'Subscribed to membership successfully'));
  } catch (error) {
    next(error);
  }
};

exports.cancelMembership = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        membershipId: null,
        membershipExpiry: null
      },
      { new: true }
    );

    res.status(200).json(new ApiResponse(200, user, 'Membership subscription cancelled'));
  } catch (error) {
    next(error);
  }
};
