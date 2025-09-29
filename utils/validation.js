const { body } = require('express-validator');

exports.registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('address.house').optional().isString().withMessage('House must be a string'),
  body('address.city').optional().isString().withMessage('City must be a string'),
  body('address.state').optional().isString().withMessage('State must be a string'),
  body('address.pin').optional().isPostalCode('IN').withMessage('Invalid PIN code format')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.profileUpdateValidation = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('address.house').optional().isString(),
  body('address.city').optional().isString(),
  body('address.state').optional().isString(),
  body('address.pin').optional().isPostalCode('IN')
];