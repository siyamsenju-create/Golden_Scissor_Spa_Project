const Booking = require('../models/Booking.model');
const User = require('../models/User.model');
const Service = require('../models/Service.model');
const Staff = require('../models/Staff.model');
const ApiResponse = require('../utils/apiResponse');

exports.getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total revenue (from completed bookings)
    const completedBookings = await Booking.find({ status: 'completed' });
    const totalRevenue = completedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    // 2. Bookings stats
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

    // 3. Customers stats
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    // 4. Active Staff counts
    const activeStaff = await Staff.countDocuments({ isActive: true });

    // 5. Monthly Revenue aggregation (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const revenueAggregation = await Booking.aggregate([
      {
        $match: {
          status: 'completed',
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRevenue = revenueAggregation.map(item => ({
      name: `${months[item._id.month - 1]} ${item._id.year}`,
      revenue: item.revenue,
      bookings: item.count
    }));

    // 6. Popular Services aggregation
    const serviceAggregation = await Booking.aggregate([
      {
        $group: {
          _id: '$serviceId',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    const popularServices = await Promise.all(
      serviceAggregation.map(async item => {
        const service = await Service.findById(item._id);
        return {
          name: service ? service.name : 'Unknown Service',
          value: item.count
        };
      })
    );

    res.status(200).json(
      new ApiResponse(
        200,
        {
          kpis: {
            totalRevenue,
            totalBookings,
            pendingBookings,
            confirmedBookings,
            cancelledBookings,
            totalCustomers,
            activeStaff
          },
          monthlyRevenue,
          popularServices
        },
        'Dashboard analytics calculated successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};
