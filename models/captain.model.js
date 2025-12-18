const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long']
        }

    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: { 
        type: String, 
        required: true,
        select: false
    },
    socketid: { 
        type: String 
    },

    status: { 
        type: String,
        enum: ['available', 'unavailable'],
        default: 'unavailable',
    },
    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters long']
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Vehicle plate must be at least 3 characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1']
        },

        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        },

        location: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
        },
    },
  
})
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    return token;
}

captainSchema.methods.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model('Captain', captainSchema);
