const express = require('express');
const app = express ();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

const errorHandleMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended:true}));


//IMPORT ALL ROUTES
const products = require('./routs/product');
const auth = require('./routs/auth');
const order = require('./routs/order');

app.use('/api', products);
app.use('/api', auth);
app.use('/api', order);


// Middleware for error handling
app.use(errorHandleMiddleware);



module.exports = app;