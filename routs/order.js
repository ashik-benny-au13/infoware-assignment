const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const { createNewOrder, myOrders, allOrders } = require('../controllers/orderController')


// Order products
router.route('/order/new').post(isAuthenticatedUser, createNewOrder);

// Own orders
router.route('/orders/myOrders').get(isAuthenticatedUser, myOrders);

// All orders
router.route('/admin/allOrders').get(isAuthenticatedUser, authorizeRoles('admin') , allOrders);



module.exports = router