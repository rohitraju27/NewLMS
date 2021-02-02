const mongoose = require('mongoose')
const topicSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide a title for week']
    },
    description:{
        type:String,
        required:[true,'Please for description for week']
    },
    photo:String,   
    week:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Week',
        required:[true,'Week is required']
    } 
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

// topicSchema.pre(/^find/,function(next){
//     this.populate({
//         path:'week',
//         select:'title'
//     })
//     next()
// })

module.exports = mongoose.model('Topic',topicSchema)