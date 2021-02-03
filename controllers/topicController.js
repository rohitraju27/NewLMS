const Topic = require('../models/topicModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllTopics = catchAsync(async (req,res,next) => {

    let filter = {}
    if(req.params.weekId){
        filter = {week:req.params.weekId}
    }
    const topics = await Topic.find(filter)

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
    // if(req.file){
    //     console.log(req.file);
    //     newTopic.avatar = req.file.path
    // }
    res.status(201).json({
        status:'success',
        data:{
            topic:newTopic
        }
    })
})

exports.deleteTopic = catchAsync( async (req,res,next) => {
    await Topic.findByIdAndDelete(req.params.id)

    res.status(204).json({
        data:null
    })
})