import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getDashboard } from '../controllers/adminController.js';

const router = express.Router();

// Admin Dashboard
router.get('/dashboard', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await getDashboard(req, res);
});

export default router;
