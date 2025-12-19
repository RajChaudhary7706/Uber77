const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle} = req.body;

    const isCaptainExist = await captainModel.findOne({ email });
    if(isCaptainExist) {
        return res.status(409).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptains({
        
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if(!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isPasswordValid = await captain.comparePassword(password);
    if(!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res) => {
  res.status(200).json(req.captain);
};

// module.exports.logoutCaptain = async (req, res) => {
//     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
//     await blackListTokenModel.create({ token: token });
//     res.clearCookie('authToken'); // if using cookies
//     res.status(200).json({ message: 'Logged out successfully' });
// };

module.exports.logoutCaptain = async (req, res) => {
  try {
    if (req.token) {
      await blackListTokenModel.create({ token: req.token });
    }

    res.clearCookie('token');
    return res.status(200).json({ message: 'Captain logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Logout failed' });
  }
};
