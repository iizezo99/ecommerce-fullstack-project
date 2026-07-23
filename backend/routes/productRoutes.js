import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';
import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();

// CREATE Product (ADMIN ONLY)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await createProduct(req, res);
});

// GET Products with SEARCH, FILTER, SORT, PAGINATION (PUBLIC)
router.get('/', getProducts);

// GET Single Product (PUBLIC)
router.get('/:id', getProductById);

// UPDATE Product (ADMIN ONLY)
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await updateProduct(req, res);
});

// DELETE Product (ADMIN ONLY)
router.delete('/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  await deleteProduct(req, res);
});

export default router;
