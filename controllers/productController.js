const Product = require("../models/product");
const apiFeatures = require("../utils/apiFeatures");


// ADD NEW PRODUCTS (BY ADMIN)                             -> api/product/new 

exports.newProduct = async (req, res, next) => {
  
    try {

    req.body.user = req.user.id;  
    const product = await Product.create(req.body);
  
    res.status(201).json({
        success: true,
        product
    })
        
    } catch (error) {
        res.status(500).json(error)
    }
  };


  // GETTING ALL PRODUCTS WITH SEARCH FEATURE           -> api/products?keyword= 

exports.getProducts = async (req, res, next) => {
    
    try {
    
        const features = new apiFeatures( Product.find(), req.query).search() 
  
        const products = await features.query;
    
        res.status(200).json({
        sucess: true,
        count: products.length,
        products,
        })
        
    } catch (error) {
        res.status(500).json(error)
    }
  };