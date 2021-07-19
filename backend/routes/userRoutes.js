import express from 'express';
const router = express.Router();
import {
  getUserProfile,
  getUsers,
  logout,
  updateUserProfile,
  userLogin,
  userRegister,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

router.route('/').post(userRegister).get(auth, admin, getUsers);
router.post('/login', userLogin);
router.post('/logout', logout);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
