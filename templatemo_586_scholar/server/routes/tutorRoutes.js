import express from 'express';
import Tutor from '../models/Tutor.js';

const router = express.Router();

// Route to add tutors
router.post('/add', async (req, res) => {
  try {
    // Validate incoming data
    const { name, subject, rating, reviews, location, availability, rate, bio } = req.body;

    if (!name || !subject || !rating || !reviews || !location || !availability || !rate || !bio) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new tutor instance
    const tutor = new Tutor({
      name,
      subject,
      rating,
      reviews,
      location,
      availability,
      rate,
      bio,
    });

    // Save the tutor to MongoDB
    await tutor.save();
    res.status(201).json({ message: 'Tutor added successfully', tutor });
  } catch (error) {
    console.error('Error adding tutor:', error.message);
    res.status(500).json({ error: 'Failed to add tutor. Please try again.' });
  }
});

// Route to get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    console.error('Error fetching tutors:', error.message);
    res.status(500).json({ error: 'Failed to fetch tutors. Please try again.' });
  }
});

export default router;