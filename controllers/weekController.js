const Week = require('../models/weekModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllWeeks = catchAsync(async (req,res,next) => {

    const weeks = await Week.find().populate('topics')

    res.status(200).json({
        status:'success',
        results:weeks.length,
        data:{
            weeks
        }
    })
})

exports.getSingleWeek = catchAsync(async (req,res,next) => {
    const week = await Week.findById(req.params.id).populate('topics')

    res.status(200).json({
        status:'success',
        data:{
            week
        }
    })
})

exports.createWeek = catchAsync(async (req,res,next) => {
    if(!req.body.batch){
        req.body.batch = req.params.batchId
    }
    const newWeek = await Week.create(req.body)

    res.status(201).json({
        status:'success',
        data:{
            week:newWeek
        }
    })
})