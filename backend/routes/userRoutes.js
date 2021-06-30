import express from 'express';
const router = express.Router();
import {userLogin} from '../controllers/userController.js'


router.get('/login', userLogin)

export default router;