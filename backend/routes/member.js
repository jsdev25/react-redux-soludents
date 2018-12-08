const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const mailer = require('nodemailer'); 
const Member = require('../models/Member');
const mailConfig = require('./../models/constants/email')
const PasswordReset = require('./../models/PasswordReset')
const uuid = require('uuid/v1')
const updateLink = require('./../models/constants/frontend')
const stripe = require('stripe')
const Subscription = require('./../models/Subscription')
/* 
email defination
*/


const Mail = config => options => callback => {
   let connection =  mailer.createTransport({
    host:config.host,
    port:config.port,
    auth: {
        user:config.username ,
        pass: config.password
    },
    tls: {
        rejectUnauthorized: true
    }
    })

    connection.sendMail(options, (error, info) => {
        if (error) {
        //    res.status(500).json({ code:'500',message:'fail',error: error });
           return console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            callback(info);
            // res.status(200).json({ code:'200',message:'success'});
        }
    })

} 

const CalculateDiff = current => previous =>{
  return (current.getHours()-previous.getHours()) <1
}

const DiffFromCurrent = CalculateDiff(new Date())
const CanResetPassword = (timestamp, success, failure) => {
    if (DiffFromCurrent(new Date(timestamp))) {
        success('Reseting password ...')
        
    } else {
        failure('your link expired')
    }
}

const HookPasswordToTable = (email,token,callback) => {
    PasswordReset.findOne({email},(err,data)=>{
        if (err) {
            console.log('DB connection connection cannot be setup')
        } else {
            if (data) {
                  PasswordReset.updateOne({email},{
                      $set:{
                          token:token,
                          timestamp:new Date()
                        }}, (err,reset)=>{
                            console.log(reset)
                            callback({email,token})
                        })
            } else {
                // insert
                PasswordReset.insertMany([{
                    token,email
                }],(err,res)=>{
                    console.log(res)
                    callback(res)
                })
            }
        }
    })

} 


const MailerWithConfig = Mail(mailConfig);


const CheckForExistence = (email,callback, failure=null) => {
    Member.findOne({email},(err,data)=>{
        if(!err){
            if (data) {
                callback(data)
            } else {
                failure({message:`${email} is not registered with us`})
            }
            
        }else if(failure){
            failure(err)
        }
    })
}

router.post('/password_reset/:email', (req, res)=>{
    // HookPasswordToTable(req.params.email,uuid())
    CheckForExistence(req.params.email, 
                    (data)=>{
                        HookPasswordToTable(data.email,uuid(),({email,token})=>{
                            const {name,lastname=""} = data
                            const linkURL = `${updateLink}/reset/${email}/${token}`
                            console.log({linkURL,name,lastname,email})
                            MailerWithConfig({
                                from: 'info@soludents.com', // sender address
                                to: email,
                                subject: 'Soludents: Confirm this email reset your password',
                                html: `
                                <b>
                                Hello, ${name} ${lastname}, To reset your password please click this link <a href=${linkURL}>Reset Password</a>. Please note this link will expire in the next hour..
                                </b>
                                `                                
                            })(
                                (success) => console.log(success)
                            )                                     
                        })

                        res.json({message:'password reset link has been sent to your email address'})
                    },
                    (err)=> {
                        res.json(err)
                    })
})

router.get('/', function (req, res) {
    Member.find(function (err, members) {
        if (err) return res.status(500).send({ error: 'database failure' });
        res.json(members);
    })
});

router.get('/admin', function (req, res) {
    Member.find({ admin: 2 }, function (err, members) {
        if (err) return res.status(500).send({ error: 'database failure' });
        res.json(members);
    })
});

router.get('/operator', function (req, res) {
    Member.find({ admin: 1 }, function (err, members) {
        if (err) return res.status(500).send({ error: 'database failure' });
        res.json(members);
    })
});

router.get('/dentist', function (req, res) {

    Member.find({ admin: 0 }, function (err, members) {
        if (err) return res.status(500).send({ error: 'database failure' });
        res.json(members)
    })
});

router.get('/:name', function (req, res) {

    Member.findOne({ _id: req.params.name }, function (err, members) {

        if (err) {
            res.status(500).json({ code: '500', message: 'fail', error: err });
        } else if (!members) {
            res.status(404).json({ code: '404', message: 'fail', error: "Not Found member !-requested resource is not available now" });
        }
        else {
            res.status(200).json({ code: '200', message: 'success', data: members });
        }
    })
});

router.put('/update/dentist/:name', function (req, res) {
    let newpass = '';
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) console.error('There was an error', err);
                else {
                    newpass = hash;
                    Member.updateMany({ _id: req.params.name }, {
                        $set: {
                            password: newpass.toString(),
                            name: req.body.name,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            phone: req.body.phone,
                            address: req.body.address,
                            adli_number: req.body.adli_number
                        }
                    }, function (err, member) {

                        if (err) {
                            res.status(500).json({ code: '500', message: 'fail', error: err });
                        } else if (!member) {
                            res.status(400).json({ code: '404', message: 'fail', error: "Not Found Member" });
                        }
                        else {
                            res.status(200).json({ code: '200', message: 'success', data: req.body });
                        }
                    })
                }
            });
        }
    });

});

router.put('/update/operator/:name', function (req, res) {
    Member.updateMany({ _id: req.params.name }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
        }
    }, function (err, member) {

        if (err) {
            res.status(500).json({ code: '500', message: 'fail', error: err });
        } else if (!member) {
            res.status(400).json({ code: '404', message: 'fail', error: "Not Found Member" });
        }
        else {
            res.status(200).json({ code: '200', message: 'success', data: req.body });
        }
    })
});

router.put('/update/user_password/:name', function (req, res) {
    let newpass = '';
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) console.error('There was an error', err);
                else {
                    newpass = hash;
                    Member.updateMany({ _id: req.params.name }, {
                        $set: {
                            password: newpass.toString()
                        }
                    }, function (err, member) {

                        if (err) {
                            res.status(500).json({ code: '500', message: 'fail', error: err });
                        } else if (!member) {
                            res.status(400).json({ code: '404', message: 'fail', error: "Not Found Member" });
                        }
                        else {
                            res.status(200).json({ code: '200', message: 'success', data: req.body });
                        }
                    })
                }
            });
        }
    });

});



router.put('/update/password_for_user/:email', function (req, res) {
    let newpass = '';
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) console.error('There was an error', err);
                else {
                    newpass = hash;
                    Member.updateMany({ email: req.params.email }, {
                        $set: {
                            password: newpass.toString()
                        }
                    }, function (err, member) {

                        if (err) {
                            res.status(500).json({ code: '500', message: 'fail', error: err });
                        } else if (!member) {
                            res.status(400).json({ code: '404', message: 'fail', error: "Not Found Member" });
                        }
                        else {
                            Member.findOne({email:req.params.email},(err,data)=>{
                                if(!err){
                                    const {name,lastname} = data
                                    MailerWithConfig({
                                        from: 'info@soludents.com', // sender address
                                        to: req.params.email,
                                        subject: 'Soludents: Your password has been updated',
                                        html: `
                                        <b>
                                        Hello, ${name} ${lastname || ""}, Your password has been updated successfully.Best regards soludents
                                        </b>
                                        `                                
                                    })(
                                        (success) => res.status(200).json({ code: '200', message: 'success', data: req.body })
                                    )
                                }
                            })
                            
                        }
                    })
                }
            });
        }
    });

});

router.put('/update/subscription/:name', function (req, res) {
    Member.updateMany({ _id: req.params.name }, {
        $set: req.body
    }, function (err, member) {

        if (err) {
            res.status(500).json({ code: '500', message: 'fail', error: err });
        } else if (!member) {
            res.status(400).json({ code: '404', message: 'fail', error: "Not Found Member" });
        }
        else {
            res.status(200).json({ code: '200', message: 'success', data: req.body });
        }
    })
});


router.delete('/:name', function (req, res) {
    Member.deleteOne({ _id: req.params.name }, function (err, member) {
        if (err) {
            res.status(500).json({ code: '500', message: 'fail', error: err });
        } else if (!member) {
            res.status(404).json({ code: '404', message: 'fail', error: "Not Found Member" });
        }
        else {
            res.status(204);
        }
    })
});

//perfect-member register
router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Member.findOne({
        email: req.body.email
    }).then(member => {
        if (member) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            var newMember = new Member(req.body);

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newMember.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newMember.password = hash;
                            newMember
                                .save()
                                .then(member => {
                                    MailerWithConfig({
                                        from: 'info@soludents.com', // sender address
                                        to: member.email,
                                        subject: `Soludents: Your account has been confirmed`,
                                        text: `Hello, ${member.name} ${member.lastname}, your account has been successfully created. Go to www.soludents.com to select your offer and start using our services. Best regards, Soludents team`,
                                        
                                    })(
                                        (success) => console.log(success)
                                    )
                                    res.json(member)
                                });
                        }
                    });
                }
            });
        }
    });
});

//perfect-member login
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Member.findOne({ email })
        .then(member => {
            if (!member) {
                errors.email = 'Member not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, member.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: member.id,
                            name: member.name,
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 30 * 60
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                    member: member,
                                    password: password
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.member.id,
        name: req.member.name,
        email: req.member.email,
        admin: req.member.admin
    });
});

router.post('/verifyEmail/:token',(req,res)=>{
    const {token} = req.params
    PasswordReset.findOne({token:token},(err,data)=>{
        if(!err){
            const {timestamp} = data
            const currentStamp = new Date()
            const validHours = (timestamp.getHours() - currentStamp.getHours()) == 0 ? true:false
            const validDate = (timestamp.getDate() - currentStamp.getDate()) == 0 ? true:false
            const validYear = (timestamp.getFullYear() - currentStamp.getFullYear()) == 0 ? true:false
            console.log({validDate,validHours,validYear}) 
            res.json({isValid:validDate && validHours && validYear})
        }
    })
})


const getMembers = () =>{
    return new Promise(
        (resolve,reject) =>{
            Member.find((err,data)=>{
                if(!err)
                   var withActive =  Promise.all(
                    data.map(
                        (user) =>{
                            const {email} = user 
                            return new Promise(
                                (res,rej) =>{
                                 Subscription.findOne({userId:email},(err,data)=>{
                                     const {active} = data || {active:'NA'}
                                         resolve({...user,active})
                                 })
                                }
                            )
                        }
                    )
                   )

                 resolve(withActive)  


            })
        }
    )
}


router.get('/subscription/withUser',(req,res)=>{
        getMembers().then(
            resp => res.json(resp)
        )
})

module.exports = router;


/* MailerWithConfig({
    to:email,
    from:`support@soludents.com`,
    subject:'Soludents: Confirm this email reset your password',
    html:`<b>
    Hello, ${name}${lastname}, To reset your password please click this link <a href=${linkURL}>Reset Password</a>. Please note this link will expire in the next hour..
    </b>`

})(
    (info)=>{
        console.log(info)
    }
)  */