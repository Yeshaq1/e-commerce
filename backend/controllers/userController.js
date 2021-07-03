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
    await generateToken(res, user._id);
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,

      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error(
      'Not Authorized, please check your email and password combination'
    );
  }
});

// --Desc: Register a user
// --Route: POST /api/users
// --access: Public Route

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('This user is already registered');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(500);
    throw new Error('Server Error');
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

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: 'user logged out' });
});

export { userLogin, getUserProfile, userRegister, logout };
