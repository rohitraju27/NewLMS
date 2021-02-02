const mongoose = require('mongoose')
const weekSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide a title for week']
    },
    description:{
        type:String,
        required:[true,'Please for description for week']
    },
    batch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Batch',
        required:[true,'Batch is required']
    }    
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

weekSchema.pre(/^find/,function(next){
    this.populate({
        path:'batch',
        select:'title'
    })
    next()
})

weekSchema.virtual('topics',{
    ref:'Topic',
    foreignField:'week',
    localField:'_id'
})

module.exports = mongoose.model('Week',weekSchema)