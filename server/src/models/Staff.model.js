const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialties: [{ type: String }],
    bio: { type: String, maxlength: 500 },
    profileImage: { type: String, default: '' },
    profileImagePublicId: { type: String, default: '' },
    experience: { type: Number, default: 0 }, // years
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    availability: [
      {
        day: { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
        startTime: String, // "09:00"
        endTime: String,   // "19:00"
        isOff: { type: Boolean, default: false },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: populate user info
StaffSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('Staff', StaffSchema);
