const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name']
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    photo:String,
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el === this.password  //abc === abc
            }
        }
    },
    passwordChangedAt:Date,
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    },
    batch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    phoneNumber:{
        type:Number,
    },
    address:{
        type:String
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTtimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000,10)
        return JWTtimestamp < changedTimeStamp
    }
    return false
}
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

userSchema.pre('save',function(next){
    if(!this.isModified('password')) return next()

    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}})
    next()
})

module.exports = mongoose.model('User',userSchema)