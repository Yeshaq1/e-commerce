import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// this is a custom middleware//
const auth = asyncHandler(async (req, res, next) => {
  if (
    // req.headers.authorization &&
    // req.headers.authorization.startsWith('Bearer')
    req.cookies.token
  ) {
    try {
      const decoded = jwt.verify(
        req.cookies.token,
        // req.headers.authorization.split(' ')[1],
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

export default auth;
