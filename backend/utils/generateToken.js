import jwt from 'jsonwebtoken';

// using jsonwebtoken to generate a token with a user Id payload.

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  return token;
};

export default generateToken;
