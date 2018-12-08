const Member = require('./models/Member')
const Subscription = require('./models/Subscription')
const moment = require('moment')

const computeChanges = () =>{
    Member.find((err,member)=>{
        if(!err)
            console.log(member)
        else
            console.log(err)
    })
}


computeChanges()