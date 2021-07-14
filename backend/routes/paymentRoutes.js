import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
const router = express.Router();
import auth from '../middleware/authMiddleware.js';

router.route('/intent').get(auth, createPaymentIntent);

export default router;
