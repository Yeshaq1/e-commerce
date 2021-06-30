import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// --Desc: Authenticate and Return Token
// --Route: GET /api/users/login
// --access: Public Route

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: null,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

export { userLogin };
