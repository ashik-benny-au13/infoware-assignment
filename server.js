const dotenv = require('dotenv');
const connectDataBase = require('./config/database')

const app = require('./app');


// setting up the path for config file
dotenv.config( {path : 'config/config.env'} )

// dataBase connecion
connectDataBase()

//PORT = 1111

app.listen(process.env.PORT, () => {
    console.log(`listening on port : ${process.env.PORT}`)
});