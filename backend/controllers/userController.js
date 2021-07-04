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
    await generateToken(res, user._id);
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user._id,
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

// --Desc: PUT user profile
// --Route: PUT /api/users/profile
// --access: Private Route

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// --Desc: Logout a user by clearing cookies.
// --Route: POST /api/users/logout
// --access: Public
// --- NEEDS A CHECK IF AUTH MIDDLEWARE IS NECCESARY.
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: 'user logged out' });
});

export { userLogin, getUserProfile, userRegister, logout, updateUserProfile };
