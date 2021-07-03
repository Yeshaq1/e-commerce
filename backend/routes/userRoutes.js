import express from 'express';
const router = express.Router();
import {
  getUserProfile,
  userLogin,
  userRegister,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

router.route('/').post(userRegister);
router.post('/login', userLogin);
router.route('/profile').get(auth, getUserProfile);

export default router;