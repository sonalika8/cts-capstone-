const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  editProfile,
  deleteProfile
} = require('../Controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidation, loginValidation, profileUpdateValidation 

} = require('../utils/validation');
const { validationResult } = require('express-validator');

// Validation handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, profileUpdateValidation, validate, updateProfile);
router.patch('/profile', protect, profileUpdateValidation, validate, editProfile);
router.delete('/profile', protect, deleteProfile);

module.exports = router;