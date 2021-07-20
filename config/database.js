const mongoose = require('mongoose');


//DB_URI = mongodb+srv://admin:admin123@cluster0.uzw92.mongodb.net/EComApp?retryWrites=true&w=majority


const connectMongoose = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    }).then(res => {
        console.log('Connected to MongoDB Database');
    })
};

module.exports = connectMongoose;