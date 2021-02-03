const Batch = require('../models/batchModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllBatch = catchAsync( async (req,res,next) => {
        
        const features = new APIFeatures(Batch.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination()

        const batches = await features.query.populate('weeks').populate('users')

        res.status(200).json({
            status:'success',
            data:{
                batches
            }
        })
})

exports.getBatch = catchAsync (async (req,res,next) => {
   
        const batch = await Batch.findById(req.params.id).populate('weeks')

        if(!batch){
            return next(new AppError('There is not batch',404))
        }

        res.status(200).json({
            status:'success',
            data:{
                batch
            }
        })
})

exports.createBatch = catchAsync (async (req,res) => {
    
        const batch = await (await Batch.create(req.body))
        res.status(200).json({
            status:'success',
            data:batch
        })
})

exports.updateBatch = catchAsync(async (req,res) => {

        const batch = await Batch.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!batch){
            return next(new AppError('There is not batch',404))
        }
        res.status(200).json({
            status:'success',
            data:batch
        })
})

exports.deleteBatch = catchAsync(async (req,res) => {
        const batch = await Batch.findByIdAndDelete(req.params.id)
        
        if(!batch){
            return next(new AppError('There is not batch',404))
        }

        res.status(200).json({
            status:'success',
            data:{}
        })
})