const Batch = require('../models/batch')

exports.getAllBatch = async (req,res) => {
    try {
        const batches = await Batch.find()
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