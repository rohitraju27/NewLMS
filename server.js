const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
process.on('uncaughtException',err => {
    console.log('UNCAUGHT EXCEPTION SHUTTING DOWN'.red);
    console.log(err.name,err.message);
    process.exit(1)
})

dotenv.config({
    path:'./config.env'
})
const app = require('./app')

mongoose.connect(process.env.DATABASE_LOCAL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB'.yellow.bold.underline);
});

const PORT = process.env.PORT || 8000
const server = app.listen(PORT,(err) => {
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is Up And Running in ${process.env.NODE_ENV} on port : ${PORT}`.green.bold.underline);
})
process.on('unhandledRejection',err => {
    console.log(err.name,err.message,err);
    server.close(() => {
        process.exit(1)
    })
})