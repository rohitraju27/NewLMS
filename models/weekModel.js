const mongoose = require('mongoose')
const weekSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide a title for week']
    },
    description:{
        type:String,
        required:[true,'Please for description for week']
    }    
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

weekSchema.virtual('batches',{
    ref:'Batch',
    foreignField:'week',
    localField:'_id'
})


module.exports = mongoose.model('Week',weekSchema)