import express from 'express';
const router = express.Router();
import { getUserProfile, userLogin } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

router.post('/login', userLogin);
router.route('/profile').get(auth, getUserProfile);

export default router;
