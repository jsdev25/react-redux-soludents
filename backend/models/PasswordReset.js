const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PasswordResetSchema = new Schema({
    email:{
        type:String,
        required:true,
    },

    token:{
        type:String,
        required:true
    },

    timestamp:{
        type:Date,
        required:true,
        default:Date.now
    }
})

const PasswordReset = mongoose.model('reset',PasswordResetSchema)

module.exports = PasswordReset