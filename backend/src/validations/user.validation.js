const { body } = require('express-validator');

const userValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('street').trim().notEmpty().withMessage('Street is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('zipcode').trim().notEmpty().withMessage('Zipcode is required'),
  body('latitude').notEmpty().withMessage('Latitude is required').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be numeric between -90 and 90'),
  body('longitude').notEmpty().withMessage('Longitude is required').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be numeric between -180 and 180'),
];

module.exports = { userValidationRules };
