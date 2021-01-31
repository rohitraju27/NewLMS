const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

exports.signup = catchAsync(async (req,res,next) => {
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })
    const token = signToken(newUser._id)
    // const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_EXPIRES_IN
    // })
    res.status(200).json({
        status:'success',
        token,
        data:{
            user : newUser
        }
    })
})

exports.login = catchAsync(async (req,res,next) => {
    const {email,password} = req.body
    if(!email || !password){
        return next(new AppError('Please provide an email and password',400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password,user.password))){
        return nect(new AppError('Invalid email or password',401))
    }
    const token = signToken(user._id)
    res.status(200).json({
        status:'success',
        token

    })
})

exports.protect = catchAsync(async (req,res,next) => {
    // getting token and check if it is there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new AppError('You are not logged in. Please Login',401))
    }
    // verifying jwt token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(new AppError('The User is belogging to this token does no longer exsist',401))
    }
    if(currentUser.changedPasswordAfter(decoded.ist)){
        return next(new AppError('User recently changed password. Please Login again',401))
    }
    req.user = currentUser
    next()  
})