const mongoose = require('mongoose')
const batchSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    users:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

batchSchema.pre(/^find/,function(next){
    this.populate({
        path:'users',
        select:'name email'
    })
    next()
})

module.exports = mongoose.model('Batch',batchSchema)