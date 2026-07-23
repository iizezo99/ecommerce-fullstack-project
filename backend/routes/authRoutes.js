import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  register, 
  login, 
  logout, 
  getProfile, 
  updateProfile 
} from '../controllers/authController.js';

const router = express.Router();

// REGISTER
router.post('/register', register);

// LOGIN
router.post('/login', login);

// LOGOUT
router.post('/logout', logout);

// GET PROFILE
router.get('/profile', authenticateToken, getProfile);

// UPDATE PROFILE
router.put('/profile', authenticateToken, updateProfile);

export default router;
