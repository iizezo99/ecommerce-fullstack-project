import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  getCart, 
  addToCart, 
  removeFromCart 
} from '../controllers/cartController.js';

const router = express.Router();

// GET Cart
router.get('/', authenticateToken, getCart);

// ADD to Cart
router.post('/add', authenticateToken, addToCart);

// REMOVE from Cart
router.delete('/remove/:productId', authenticateToken, removeFromCart);

export default router;
