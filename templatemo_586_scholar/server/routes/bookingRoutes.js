import express from 'express';
import Booking from '../models/booking.js';
import Tutor from '../models/Tutor.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bookings for a specific tutor
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    const bookings = await Booking.find({ tutorId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available slots for a specific tutor on a specific date
router.get('/available/:tutorId/:date', async (req, res) => {
  try {
    const { tutorId, date } = req.params;
    
    // Parse date and get day of week
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    
    // Get tutor's availability
    const tutor = await Tutor.findOne({ id: tutorId });
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }
    
    // Get all possible slots for this day
    const allSlots = isWeekend 
      ? tutor.availabilitySlots.weekends 
      : tutor.availabilitySlots.weekdays;
    
    // Get booked slots for this tutor on this date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const bookedSlots = await Booking.find({
      tutorId,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).select('time');
    
    // Convert booked slots to array of times
    const bookedTimes = bookedSlots.map(slot => slot.time);
    
    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
    
    res.json({
      date,
      availableSlots,
      bookedSlots: bookedTimes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { tutorId, date, time, studentName, studentEmail } = req.body;
    
    // Check if the tutor exists
    const tutor = await Tutor.findOne({ id: tutorId });
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }
    
    // Check if the slot is available
    const bookingDate = new Date(date);
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingBooking = await Booking.findOne({
      tutorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      time
    });
    
    if (existingBooking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'This slot is already booked' });
    }
    
    // Create the booking
    const booking = new Booking({
      tutorId,
      date: bookingDate,
      time,
      studentName,
      studentEmail
    });
    
    await booking.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({ 
      message: 'Booking created successfully', 
      booking 
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
});

// Cancel a booking
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;