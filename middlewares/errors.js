const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';


    // for validation of each schema parameters
    
    if(err.name == 'ValidationError') {                    
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorHandler(message,400)
    };
    
    // for dupliacte email id registration

    if(err.code == 11000){
        const message = 'This Email ID is allready Registered.Please enter a new Email ID'
        error = new ErrorHandler(message,400)
    };
    
    // for Invalid jwt tokens

    if(err.name == 'JsonWebTokenError') {                    
        const message = 'Invalid token.Try Again'
        error = new ErrorHandler(message,400)
    };


    res.status(error.statusCode).json({
        sucess : false,
        message : error.message || 'Server Error Occurs Internally'
    })
}