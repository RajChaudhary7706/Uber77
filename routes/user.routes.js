const express = require('express');
const router = express.Router();
const{body} = require('express-validator');
const userController = require('../controller/user.controller');
const authmiddleware = require('../middleware/auth.middleware');


router.post('/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
],
    userController.loginUser
)

router.get('/profile', authmiddleware.authUser, userController.getUserProfile);

router.get('/logout', authmiddleware.authUser, authmiddleware.logoutUser);

module.exports = router;
