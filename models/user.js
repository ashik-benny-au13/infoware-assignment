const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please Enter your name']
    },
    email : {
        type : String,
        required : [true, 'Please Enter your E-mail ID'] ,
        validator : [validator.isEmail, 'Enter a valid E-mail ID'],
        unique : true
    },
    password : {
        type : String,
        select : false,
        required : [true, 'Please Enter your password'] ,
        minlength : [5, 'Password needs a minimum charcter length of 5']
    },
    avatar : {
        public_id: {
            type:String,
            required : true
            },
        url: {
            type:String,
            required : true
            }
    },
    role : {
        type : String,
        default : 'user'
    },
    createdAt : {
        type : String,
        default : Date.Now
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date

});


// Password encryption 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});


// JWT genaration
userSchema.methods.getJwtToken = function() {

// JWT_SECRET_KEY = THISISTHEJWTSECRETFORTHISPROJECTIN2021
// JWT_EXPIRES_TIME = 5d

    return jwt.sign({ id:this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    });
};


// password compairing
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};



module.exports = mongoose.model('User', userSchema);