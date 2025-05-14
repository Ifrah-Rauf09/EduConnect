import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(authMiddleware);

router.get('/me', getProfile);
router.patch('/update', updateProfile);

export default router;
