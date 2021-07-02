import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// --Desc: Authenticate and Return Token
// --Route: POST /api/users/login
// --access: Public Route

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

// --Desc: GET user profile
// --Route: GET /api/users/profile
// --access: Private Route

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { userLogin, getUserProfile };
