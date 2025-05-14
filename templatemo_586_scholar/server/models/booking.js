import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  tutorId: { 
    type: String, 
    required: true,
    ref: 'Tutor'
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  studentName: { 
    type: String, 
    required: true 
  },
  studentEmail: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  }
});

// Compound index to ensure no double bookings
bookingSchema.index({ tutorId: 1, date: 1, time: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;