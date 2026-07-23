import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { 
  createCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController.js';

const router = express.Router();

// CREATE Category (ADMIN ONLY)
router.post('/', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await createCategory(req, res);
});

// GET All Categories (PUBLIC)
router.get('/', getCategories);

// GET Single Category (PUBLIC)
router.get('/:id', getCategoryById);

// UPDATE Category (ADMIN ONLY)
router.put('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await updateCategory(req, res);
});

// DELETE Category (ADMIN ONLY)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await deleteCategory(req, res);
});

export default router;
