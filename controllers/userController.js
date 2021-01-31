const User = require('../models/user')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllUser = catchAsync( async (req,res,next) => {
        const users = await User.find()

        res.status(200).json({
            status:'success',
            data:{
                users
            }
        })
})

exports.getUser = catchAsync (async (req,res,next) => {
   
        const user = await User.findById(req.params.id)

        if(!user){
            return next(new AppError('There is no user',404))
        }

        res.status(200).json({
            status:'success',
            data:{
                user
            }
        })
})

exports.createUser = catchAsync (async (req,res) => {
    
        const user = await Batch.create(req.body)
        res.status(200).json({
            status:'success',
            data:user
        })
})

exports.updateUser = catchAsync(async (req,res) => {

        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!user){
            return next(new AppError('There is no user',404))
        }
        res.status(200).json({
            status:'success',
            data:user
        })
})

exports.deleteUser = catchAsync(async (req,res) => {
        const user = await User.findByIdAndDelete(req.params.id)
        
        if(!user){
            return next(new AppError('There is no user',404))
        }

        res.status(200).json({
            status:'success',
            data:{}
        })
})