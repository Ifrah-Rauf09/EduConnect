import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Tutor from '../models/Tutor.js';

dotenv.config(); // Ensure this is at the top of the file

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debugging: Check if the URI is loaded

const populateTutors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read tutors.json file
    const tutorsFilePath = path.resolve('../assets/data/tutors.json');
    const tutorsData = JSON.parse(fs.readFileSync(tutorsFilePath, 'utf-8'));

    // Clear existing tutors
    await Tutor.deleteMany();
    console.log('🗑️ Existing tutors cleared');

    // Insert new tutors
    await Tutor.insertMany(tutorsData.tutors);
    console.log('✅ Tutors added successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error populating tutors:', error);
    process.exit(1);
  }
};

populateTutors();