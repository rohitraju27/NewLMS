const Topic = require('../models/topicModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const fileUpload = require('express-fileupload')
const path = require('path')
const multer = require('multer')
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
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
    }
})

exports.upload = multer({
    storage:storage
})

exports.createTopic = catchAsync(async (req,res,next) => {
    if(!req.body.week){
        req.body.week = req.params.weekId
    }
    const file = req.files
    if(!file){
        return next(new AppError('There is no file',400))
    }
    let newTopic = await Topic.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            // topic:newTopic,files:file
            newTopic,

        }
    })
})

exports.deleteTopic = catchAsync( async (req,res,next) => {
    await Topic.findByIdAndDelete(req.params.id)

    res.status(204).json({
        data:null
    })
})