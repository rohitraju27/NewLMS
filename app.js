const express = require('express')
const PORT = process.env.NODE_ENV || 8000
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const mongoose = require('mongoose')

dotenv.config({
    path:'./config.env'
})

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

mongoose.connect(process.env.DATABASE_LOCAL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB'.green);
});

const batchRouter = require('./routes/batchRoutes')

app.use('/api/v1/batches',batchRouter)


app.all('*',(req,res,next) => {
    // res.status(404).json({
    //     status:'fail',
    //     message:`Can't find ${req.originalUrl} on this request`
    // })
    const error = new Error(`Can't find ${req.originalUrl} on this request`)
        error.statusCode = 404
        error.status = 'fail'
        next(error)
})

app.use((err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
    next()
})


app.listen(PORT, (err) => {
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is up and running in ${process.env.NODE_ENV} mode on port : ${PORT}`.yellow.bold.underline)
})