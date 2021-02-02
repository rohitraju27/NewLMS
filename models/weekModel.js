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
    timestamps:true
})


module.exports = mongoose.model('Week',weekSchema)