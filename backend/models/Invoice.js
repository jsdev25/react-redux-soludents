const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    
    address:{
        type:String,
        default:null
    },

    description:{
        type:String,
        required:true
    },
    
    InvoiceNumber:{
        type:String,
        required:true
    },

    FullName:{
        type:String,
        required:true
    },
    
    OfferNumber:{
        type:String,
        required:true
    },
    InvoiceDate:{
        type:String,
        required:true
    },

    TVA:{
        type:Number,
        required:true
    },

    tvaPer:{
        type:String
    },

    amount:{
        type:Number,
        required:true
    },
    
    subscriptionId:{
        type:String,
        required:true
    },

    TTC:{
        type:Number,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        default:null
    }
})


const Invoice = mongoose.model('invoices',InvoiceSchema)
module.exports= Invoice
