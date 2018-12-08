const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  phone: {
    type: String
  },
  adli_number: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  img: String,
  document_count: {
    type: Number,
    max: 30,
  },
  subscription: Number,
  admin: {
    type: Number,
    min: 0,
    max: 2,
    required: true,
    default: 2
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  update_date: {
    type: Date
  },

  stripeId:{
    type:String,
    default:null
  }

});

const Member = mongoose.model("members", MemberSchema);
module.exports = Member;
