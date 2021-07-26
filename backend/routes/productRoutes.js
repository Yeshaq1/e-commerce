import express from 'express';
const router = express.Router();
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

router.route('/').get(getProducts);

router.route('/:id').get(getProductById).delete(auth, admin, deleteProduct);

export default router;
