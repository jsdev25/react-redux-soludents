const mongoose = require('mongoose')
const SubscriptionSchema = new mongoose.Schema({
  customerId:{
      type:String,
      required:true
  },
  subscription:{
      type:Object,
      required:true
  },
  
  subscriptionId:{
      type:String,
      required:true
  },

  userId:{
      type:String,
      required:true
  },

  start:{
      type:Number,
      required:true
  },

  end:{
    type:Number,
    required:true
  }
})

const Subscription = mongoose.model('subscriptions',SubscriptionSchema)

module.exports = Subscription
