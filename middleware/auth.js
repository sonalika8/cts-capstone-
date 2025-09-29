const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // ✅ Now decoded is defined

    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    console.log('Authenticated user:', user); // ✅ Use 'user', not 'req.user' yet
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};