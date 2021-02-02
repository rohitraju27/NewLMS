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
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
},{
    timestamps:true
})

module.exports = mongoose.model('Topic',topicSchema)