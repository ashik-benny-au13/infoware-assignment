const Order = require('../models/order');
const Product = require('../models/product');


// NEW ORDER                                -> api/order/new

exports.createNewOrder = async (req,res,next) => {

    try {

        const { 
            shippingDetails, 
            orderedItems, 
            itemsPrice, 
            shippingPrice, 
            taxPrice, 
            totalPrice, 
            itemsPaymentInfo } = req.body;
    
        const order = await Order.create({
            shippingDetails,
            orderedItems, 
            itemsPrice, 
            shippingPrice, 
            taxPrice, 
            totalPrice, 
            itemsPaymentInfo, 
            user : req.user._id , 
            paidDate : Date.now()
        });
    
        res.status(200).json({
            sucess: true,
            message: "Order has placed",
            order
        });
        
    } catch (error) {
        res.status(500).json(error)
    }
};


// TO SEE OWN ORDERS                        -> api/orders/myOrders

exports.myOrders  = async (req,res,next) => {

    try {

        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({
        success: true,
        orders
    });   

    } catch (error) {
        res.status(500).json(error)
    }
};


// GET ALL ORDERS (BY ADMIN)                -> api/admin/allOrders

exports.allOrders = async (req,res,next) => {

    try {

    const allOrders = await Order.find();

    res.status(200).json({
        sucess: true,
        allOrders
    })
        
    } catch (error) {
        res.status(500).json(error)
    }

};