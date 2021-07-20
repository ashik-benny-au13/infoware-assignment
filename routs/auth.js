const express = require('express');
const router  = express.Router();

const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
const {registerUser, loginUser} = require('../controllers/authController');


// User Registeration 
router.route('/register').post(registerUser);

// Add user (By Admin) 
router.route('/addUser').post(isAuthenticatedUser, authorizeRoles('admin'),registerUser);

// User Login
router.route('/login').post(loginUser);






module.exports = router;