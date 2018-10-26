const express = require('express');
const router = express.Router();

const Subscription = require('../models/Subscription');

router.post('/subscription', function(req, res){

    console.log('ok');
    var subscription = new Subscription(req.body);
    subscription.save(function(err){
        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        } else {
            res.status(201).json({ code:'201',message:'success - new pay subscription is created',data:req.body });
        }
    });
});

module.exports = router;