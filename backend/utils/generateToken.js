import jwt from 'jsonwebtoken';

// using jsonwebtoken to generate a token with a user Id payload.

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    secure: false,
    httpOnly: true,
  });
};

export default generateToken;
