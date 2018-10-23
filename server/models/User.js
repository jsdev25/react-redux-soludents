const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    number: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    admin:{
        type:Number,
        default:0
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;