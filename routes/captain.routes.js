const captainController = require('../controller/captain.controller');
const express = require('express');
const router = express.Router();
const{body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike, or auto')
  ],
  captainController.registerCaptain
);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({min:6}).withMessage('Password is required')
],
  captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;