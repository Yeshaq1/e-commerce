import express from 'express';
const router = express.Router();
import { addOrder } from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';

router.route('/').post(auth, addOrder);

export default router;
