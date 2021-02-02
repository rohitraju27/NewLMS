const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const filterObj = (obj,...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObj[el] = obj[el]
        }
    })
    return newObj
}

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

exports.updateMe = catchAsync(async (req,res,next) => {
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password update. please use updatePassword route',401))
    }

    const filterBody = filterObj(req.body,'name','email')
    const updatedUser = await User.findByIdAndUpdate(req.user.id,filterBody,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        status:'success',
        data :{
            user : updatedUser
        }
    })
})

exports.deleteMe = catchAsync( async (req,res,next) => {
    await User.findByIdAndUpdate(req.user.id,{active:false})

    res.status(200).json({
        status:'success',
        data:null
    })
})

// exports.createUser = catchAsync (async (req,res) => {
    
//         const user = await Batch.create(req.body)
//         res.status(200).json({
//             status:'success',
//             data:user
//         })
// })

// exports.updateUser = catchAsync(async (req,res) => {

//         const user = await User.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!user){
//             return next(new AppError('There is no user',404))
//         }
//         res.status(200).json({
//             status:'success',
//             data:user
//         })
// })

// exports.deleteUser = catchAsync(async (req,res) => {
//         const user = await User.findByIdAndDelete(req.params.id)
        
//         if(!user){
//             return next(new AppError('There is no user',404))
//         }

//         res.status(200).json({
//             status:'success',
//             data:{}
//         })
// })

exports.getUser = (req,res) => {
    res.status(500).json({
        status:'Error',
        messsage:"This route is not yet defined"
    })
}

exports.createUser = (req,res) => {
    res.status(500).json({
        status:'Error',
        messsage:"This route is not yet defined"
    })
}

exports.updateUser = (req,res) => {
    res.status(500).json({
        status:'Error',
        messsage:"This route is not yet defined"
    })
}

exports.deleteUser = (req,res) => {
    res.status(500).json({
        status:'Error',
        messsage:"This route is not yet defined"
    })
}