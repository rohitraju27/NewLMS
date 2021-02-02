const Week = require('../models/weekModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllWeeks = catchAsync(async (req,res,next) => {
    const weeks = await Week.find()

    res.status(200).json({
        status:'success',
        results:weeks.length,
        data:{
            weeks
        }
    })
})

exports.createWeek = catchAsync(async (req,res,next) => {
    const newWweek = await Week.create(req.body)

    res.status(201).json({
        status:'success',
        data:{
            week:newWweek
        }
    })
})