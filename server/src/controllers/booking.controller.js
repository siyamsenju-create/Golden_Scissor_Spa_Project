const Booking = require('../models/Booking.model');
const Staff = require('../models/Staff.model');
const Service = require('../models/Service.model');
const User = require('../models/User.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const { sendBookingConfirmation } = require('../services/emailService');

exports.createBooking = async (req, res, next) => {
  try {
    const { staffId, serviceId, date, timeSlot, notes } = req.body;
    const customerId = req.user._id;

    // Validate inputs
    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      throw new ApiError(404, 'Selected service is invalid or unavailable');
    }

    const staff = await Staff.findById(staffId).populate('userId', 'name email');
    if (!staff || !staff.isActive) {
      throw new ApiError(404, 'Selected stylist is unavailable');
    }

    const bookingDate = new Date(date);
    bookingDate.setHours(0,0,0,0);

    // Prevent double booking
    const doubleBooked = await Booking.findOne({
      staffId,
      date: bookingDate,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (doubleBooked) {
      throw new ApiError(400, 'This stylist is already reserved for the selected time slot.');
    }

    const booking = await Booking.create({
      customerId,
      staffId,
      serviceId,
      date: bookingDate,
      timeSlot,
      totalAmount: service.price,
      notes
    });

    // Award loyalty points: 10% of total price
    const loyaltyPointsEarned = Math.floor(service.price * 0.1);
    await User.findByIdAndUpdate(customerId, {
      $inc: { loyaltyPoints: loyaltyPointsEarned }
    });

    // Send confirmation email
    const customerName = req.user.name;
    const customerEmail = req.user.email;
    const serviceName = service.name;
    const staffName = staff.userId.name;
    
    await sendBookingConfirmation(customerEmail, {
      customerName,
      serviceName,
      staffName,
      date: bookingDate.toLocaleDateString(),
      timeSlot,
      price: service.price
    });

    res.status(201).json(new ApiResponse(201, booking, 'Booking created successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    let query = {};

    // Customer gets own bookings
    if (req.user.role === 'customer') {
      query.customerId = req.user._id;
    } 
    // Staff gets assigned bookings
    else if (req.user.role === 'staff') {
      const staff = await Staff.findOne({ userId: req.user._id });
      if (staff) {
        query.staffId = staff._id;
      } else {
        query.staffId = null;
      }
    }

    const bookings = await Booking.find(query)
      .populate('customerId', 'name email phone')
      .populate('serviceId', 'name duration price category')
      .populate({
        path: 'staffId',
        populate: { path: 'userId', select: 'name avatar' }
      })
      .sort('-date -timeSlot');

    res.status(200).json(new ApiResponse(200, bookings, 'Bookings retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('serviceId', 'name duration price category')
      .populate({
        path: 'staffId',
        populate: { path: 'userId', select: 'name avatar' }
      });

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    // Auth guard
    if (
      req.user.role === 'customer' &&
      booking.customerId._id.toString() !== req.user._id.toString()
    ) {
      throw new ApiError(403, 'Not authorized to view this booking');
    }

    res.status(200).json(new ApiResponse(200, booking, 'Booking retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    // Role check
    if (req.user.role === 'customer') {
      throw new ApiError(403, 'Customers cannot change booking statuses directly');
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, `Booking status set to ${status}`));
  } catch (error) {
    next(error);
  }
};

exports.rescheduleBooking = async (req, res, next) => {
  try {
    const { date, timeSlot } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (req.user.role === 'customer' && booking.customerId.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized to modify this booking');
    }

    const bookingDate = new Date(date);
    bookingDate.setHours(0,0,0,0);

    // Prevent double booking
    const doubleBooked = await Booking.findOne({
      _id: { $ne: booking._id },
      staffId: booking.staffId,
      date: bookingDate,
      timeSlot,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (doubleBooked) {
      throw new ApiError(400, 'The stylist is busy at the selected date and time');
    }

    booking.date = bookingDate;
    booking.timeSlot = timeSlot;
    booking.status = 'pending'; // Reset approval workflow
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, 'Booking rescheduled successfully'));
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }

    if (req.user.role === 'customer') {
      if (booking.customerId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Not authorized to cancel this booking');
      }

      // 24 hour rule
      const timeDiff = new Date(booking.date).getTime() - Date.now();
      const hoursDiff = timeDiff / (1000 * 3600);
      if (hoursDiff < 24) {
        throw new ApiError(400, 'Appointments must be cancelled at least 24 hours in advance');
      }
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json(new ApiResponse(200, booking, 'Booking cancelled successfully'));
  } catch (error) {
    next(error);
  }
};

exports.getAvailableSlots = async (req, res, next) => {
  try {
    const { staffId, date } = req.query;

    if (!staffId || !date) {
      throw new ApiError(400, 'Please provide both staffId and date parameters');
    }

    const searchDate = new Date(date);
    searchDate.setHours(0,0,0,0);

    const staff = await Staff.findById(staffId);
    if (!staff) {
      throw new ApiError(404, 'Staff member not found');
    }

    // Get day name (Monday - Sunday)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[searchDate.getDay()];

    const dayAvailability = staff.availability.find(av => av.day === dayName && !av.isOff);
    if (!dayAvailability) {
      return res.status(200).json(new ApiResponse(200, [], 'Stylist has no availability on this day'));
    }

    // Construct array of slots
    // For demonstration, standard 60-min intervals. 
    // In a production spa, we parse dayAvailability.startTime and endTime.
    // e.g. "09:00" to "18:00" -> ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]
    const slots = [];
    const [startHour, startMin] = dayAvailability.startTime.split(':').map(Number);
    const [endHour, endMin] = dayAvailability.endTime.split(':').map(Number);

    let current = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;
    const interval = 60; // 1-hour slots

    while (current + interval <= end) {
      const hour = Math.floor(current / 60);
      const min = current % 60;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const formattedMin = min.toString().padStart(2, '0');
      slots.push(`${displayHour}:${formattedMin} ${period}`);
      current += interval;
    }

    // Get existing bookings for this stylist on this day
    const reservedBookings = await Booking.find({
      staffId,
      date: searchDate,
      status: { $in: ['pending', 'confirmed'] }
    });

    const reservedSlots = reservedBookings.map(b => b.timeSlot);

    // Filter available slots
    const availableSlots = slots.map(slot => ({
      slot,
      isAvailable: !reservedSlots.includes(slot)
    }));

    res.status(200).json(new ApiResponse(200, availableSlots, 'Available slots calculated'));
  } catch (error) {
    next(error);
  }
};
