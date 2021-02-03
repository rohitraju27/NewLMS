const mongoose = require('mongoose')
const batchSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    } 
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

// batchSchema.pre(/^find/,function(next){
//     this.populate({
//         path:'user',
//         select:'name email'
//     }).populate({
//         path:'week',
//         select:'title'
//     })
//     next()
// })

batchSchema.virtual('weeks',{
    ref:'Week',
    foreignField:'batch',
    localField:'_id'
})

batchSchema.virtual('users',{
    ref:'User',
    foreignField:'batch',
    localField:'_id'
})

module.exports = mongoose.model('Batch',batchSchema)