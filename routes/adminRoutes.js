const express = require('express');
const { register, login, getProfile, updateProfile } = require('../Controllers/authController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);         // Public route to register a user
router.post('/login', login);               // Public route to log in and get JWT
router.get('/profile', protect, getProfile); // Protected route to get user profile
router.put('/profile', protect, updateProfile); // Protected route to update profile

module.exports = router;