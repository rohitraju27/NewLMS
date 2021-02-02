const mongoose = require('mongoose')
const batchSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:[true,'Batch must belong to user']
        }
    ,
    week:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Week',
            required:[true,'Batch must belong to week']
        }
    
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

batchSchema.pre(/^find/,function(next){
    this.populate({
        path:'user',
        select:'name email'
    }).populate({
        path:'week',
        select:'title'
    })
    next()
})

module.exports = mongoose.model('Batch',batchSchema)