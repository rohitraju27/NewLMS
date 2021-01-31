const AppError = require('../utils/appError')

const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
}

const sendErrorProd = (err,res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }else{
        // Programming and other unknown error
        console.log('Error',err);
        res.status(500).json({
            status:'fail',
            message:'Something went very wrong'
        })
    }
    
}

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path} : ${err.value}`
    return next(new AppError(message,400))
}

const handleDuplicateErrorDB = err => {
    const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)
    const message = `Duplicate field ${value}. please use another`
    return next(new AppError(message,400))
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data ${errors.join('. ')}`
    return next(new AppError(message,400))
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err,res)
    }else if(process.env.NODE_ENV === 'production'){
        let error = {...err}
        if(error.name === 'CastError')  error = handleCastErrorDB(error)
        if(error.code === 11000) error = handleDuplicateErrorDB(error)
        if(error.name === 'ValidationError') error = handleValidationError(error) 
        sendErrorProd(error,res)
    }

   
    next()
}