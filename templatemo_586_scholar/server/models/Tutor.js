import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  image: { type: String, required: true }, // Path to the image
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  location: { type: String, required: true },
  availability: { type: String, required: true },
  rate: { type: String, required: true },
  bio: { type: String, required: true },
  education: [
    {
      degree: { type: String, required: true },
      university: { type: String, required: true },
    },
  ],
  subjects: [{ type: String, required: true }],
  reviewsList: [
    {
      author: { type: String, required: true },
      rating: { type: Number, required: true },
      date: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
});

const Tutor = mongoose.model('Tutor', tutorSchema);
export default Tutor;