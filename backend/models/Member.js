const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name:{
       type: String,
       required: true
    },
    email:{
        type: String,
        required: true
     },
    password:{
        hash_password:{ 
            type: String,
            required: true
         },
        real_passwird:{ 
            type: String, 
            required: true 
        },
    },
    img: String,
    document_count: {
        type: Number,
        max:10
    },
    subscription: {
        offer1:Boolean,
        offer2:Boolean,
        offer3:Boolean,
        offer4:Boolean,
        offer5:Boolean,
        offer6:Boolean
    },
    admin: {
        type: Number,
        min: 0,
        max: 2,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date
    }
});

const Member = mongoose.model('members', MemberSchema);

module.exports = Member;