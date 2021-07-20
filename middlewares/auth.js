const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');


// checks whether the user is logged in

exports.isAuthenticatedUser  = async (req, res, next) => {
    
    try {

    const { token } = req.cookies

    if(!token) {
        return next(new ErrorHandler('Please Login', 401));
    };
    
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(verifiedUser.id);           

    next()
        
    } catch (error) {
        res.status(500).json(error)
    }
};


// user roles HANDLING

exports.authorizeRoles = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You are not allowed to access this task!!',403))
        };
        next();
    };
};
