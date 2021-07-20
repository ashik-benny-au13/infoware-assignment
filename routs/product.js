const express = require('express');
const router  = express.Router();
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {newProduct, getProducts} = require('../controllers/productController');



// Add new Product
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);

// Get all products
router.route('/products').get(isAuthenticatedUser, getProducts);




module.exports = router