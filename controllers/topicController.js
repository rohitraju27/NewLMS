const Topic = require('../models/topicModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllTopics = catchAsync(async (req,res,next) => {
    const topics = await Topic.find()

    res.status(200).json({
        status:'success',
        results:topics.length,
        data:{
            topics
        }
    })
})

exports.getSingleTopic = catchAsync(async (req,res,next) => {
    const topic = await Topic.findById(req.params.id)

    res.status(200).json({
        status:'success',
        data:{
            topic
        }
    })
})

exports.createTopic = catchAsync(async (req,res,next) => {
    if(!req.body.week){
        req.body.week = req.params.weekId
    }
    const newTopic = await Topic.create(req.body)

    res.status(201).json({
        status:'success',
        data:{
            topic:newTopic
        }
    })
})