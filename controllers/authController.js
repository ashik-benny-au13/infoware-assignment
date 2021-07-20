const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const sendToken = require('../utils/jwtToken');


// ADD ACCOUNT (NEW USER REGISTRATION)          -> api/register

exports.registerUser  = async(req,res,next) => {

    try {
        const { name,email,password } = req.body

        const user = await User.create ({
            name,email,password,
            avatar : {
                public_id : 'avatars/oqkc02mcm68jqzfxi0b8.jpg',
                url : 'https://res.cloudinary.com/dy0tqwsxl/image/upload/v1624617199/avatars/oqkc02mcm68jqzfxi0b8.jpg'
                }
        })

        sendToken(user,200,res)
        
    } catch (error) {
        res.status(500).json(error)
    }

};


// USER LOGIN                                   -> api/login

exports.loginUser  = async (req,res,next) => {
    
    try {

        const { email,password } = req.body;
    
        if(!email) {
            return next(new ErrorHandler('Enter your Registered Email ID', 400));
        };
        if(!password) {
            return next(new ErrorHandler('Enter your Password', 400));
        };
        
        //search for user in database
        const user = await User.findOne({email}).select('+password')
        
        if(!user) {
            return next(new ErrorHandler('Invalid User', 401));
        };
        
        //checks for the correct password
        const correctPassword = await user.comparePassword(password)
        
        if(!correctPassword) {
            return next(new ErrorHandler('Invalid Password', 401));
        }

        sendToken(user,200,res)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
};