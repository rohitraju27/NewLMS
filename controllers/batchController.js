const Batch = require('../models/batch')
const APIFeatures = require('../utils/apiFeatures')
exports.getAllBatch = async (req,res) => {
    try {
        // filtering
        // const queryObj = {...req.query}
        // const excludedFields = ['page','sort','limit','fields']
        // excludedFields.forEach(el => delete queryObj[el])
        
        
        // // advanced filtering
        // let queryStr = JSON.stringify(queryObj)
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`)

        // let query = Batch.find(JSON.parse(queryStr))

        // sorting
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     query = query.sort(sortBy) 
        // }else{
        //     query = query.sort('-createdAt')
        // }

        // limiting fields
        // if(req.query.fields){
        //     const fields = req.query.fields.split(',').join(' ')
        //     query = query.select(fields)
        // }else{
        //     query = query.select('-__v')
        // }

        // pagination
        // const page = req.query.page * 1 || 1
        // const limit = req.query.limit * 1 || 50
        // const skip = (page - 1) * limit
        // query = query.skip(skip).limit(limit)
        
        // if(req.query.page){
        //     const newbatches = await Batch.countDocuments()
        //     if(skip >= newbatches) throw new Error('This page does not exsist')
        // }

        const features = new APIFeatures(Batch.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination()
        
        const batches = await features.query
        
        res.status(200).json({
            status:'success',
            data:{
                batches
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error.message
        })
    }
}

exports.getBatch = async (req,res) => {
    try {
        const batch = await Batch.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data:{
                batch
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error.message
        })
    }
}

exports.createBatch = async (req,res) => {
    try {
        const batch = await Batch.create({
            title:req.body.title
        })
        res.status(200).json({
            status:'success',
            data:batch
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}

exports.updateBatch = async (req,res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:'success',
            data:batch
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}

exports.deleteBatch = async (req,res) => {
    try {
        await Batch.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:'success',
            data:{}
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error
        })
    }
}