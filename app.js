const express = require('express')
const app = express();
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const batchRouter = require('./routes/batchRoutes')
const userRouter = require('./routes/userRoutes')
const weekRouter = require('./routes/weekRoutes')
const topicRouter = require('./routes/topicRoutes')
const adminUserRouter = require('./routes/adminUserRoutes')

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())


app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next() 
})

app.use('/api/v1/batches',batchRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/weeks',weekRouter)
app.use('/api/v1/topics',topicRouter)
app.use('/api/v1/admin',adminUserRouter)


app.use('/uploads',express.static('uploads'))

app.all('*',(req,res,next) => {
    next(new Error(`Can't find ${req.originalUrl} on this route`,404))
})

app.use(globalErrorHandler)


module.exports = app