import express from 'express';
const router = express.Router();
import {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  markOrderAsDeliveredById,
} from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

router.route('/').post(auth, addOrder).get(auth, admin, getAllOrders);
router.route('/myorders').get(auth, getOrders);
router
  .route('/:id')
  .get(auth, getOrderById)
  .put(auth, admin, markOrderAsDeliveredById);

export default router;
