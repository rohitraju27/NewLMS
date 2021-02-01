const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const sendEmail = require('../utils/email')
const crypto = require('crypto')

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id)
    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.signup = catchAsync(async (req,res,next) => {
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm
    })
    // const token = signToken(newUser._id)
    // // const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
    // //     expiresIn:process.env.JWT_EXPIRES_IN
    // // })
    // res.status(200).json({
    //     status:'success',
    //     token,
    //     data:{
    //         user : newUser
    //     }
    // })
    createSendToken(newUser,201,res)
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
    // const token = signToken(user._id)
    // res.status(200).json({
    //     status:'success',
    //     token

    // })
    createSendToken(user,201,res)
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

exports.restrictTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',401))
        }
        next()
    }
}

exports.forgotPassword = catchAsync(async(req,res,next) => {
    // get the user based on posted email
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return next(new AppError('There no user with that email',404))
    }
    // generate token
    const resetToken = user.createPasswordResetToken()

    await user.save({validateBeforeSve:false})

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a Patch request with your new password and passwordConfirm to : ${resetURL}.\n if you didn't forgot your password, please ignore this email`

    try {
        await sendEmail({
            email:user.email,
            subject:'Your password resetToken (valid for 10 min)',
            message
        })
        res.status(200).json({
            status:'success',
            message:'Token sent to email'
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSve:false})

        return next(new AppError('There was an error in sending mail. please try again later',500))
    }
})

exports.resetPassword = catchAsync(async(req,res,next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({passwordResetToken:hashedToken,passwordResetExpires:{$gt:Date.now()}})

    if(!user){
        return next(new AppError('Token is invalid or has expired',400))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    // const token = signToken(user._id)

    // res.status(200).json({
    //     status:'success',
    //     token
    // })
    createSendToken(user,200,res)
})

exports.updatePassword = catchAsync( async (req,res,next) => {
    const user = await User.findById(req.user.id).select('+password')

    if(!(await user.correctPassword(req.body.passwordCurrent,user.password))){
        return next(new AppError('You password is wrong',401))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()

    createSendToken(user,200,res)
})