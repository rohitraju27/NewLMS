const express = require('express')
const PORT = process.env.NODE_ENV || 8000
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config({
    path:'./config.env'
})

if(process.env.NODE_ENV === 'development'){
    app.use(morgan())
}

app.listen(PORT, (err) => {
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port : ${PORT}`)
})