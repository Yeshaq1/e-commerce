import express from 'express';
const router = express.Router();
import {
  addOrder,
  getOrderById,
  getOrders,
} from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';

router.route('/').post(auth, addOrder);
router.route('/myorders').get(auth, getOrders);
router.route('/:id').get(auth, getOrderById);

export default router;
