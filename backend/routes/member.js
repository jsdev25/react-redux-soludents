const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const Member = require('../models/Member');

router.get('/', function(req,res){
    Member.find(function(err, members){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(members);
    })
  });

router.get('/:name', function(req, res){
    Member.findOne({_id: req.params.name}, function(err, members){

        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        }else if(!members){
            res.status(404).json({code:'404',message:'fail',error:"Not Found member !-requested resource is not available now" });
        }
        else {
            res.status(200).json({ code:'200',message:'success',data:members });
        }
    })
});


router.delete('/:name', function(req, res){
    Member.deleteOne({ _id: req.params.name }, function(err, member){
        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        }else if(!member){
            res.status(404).json({code:'404',message:'fail',error:"Not Found Member" });
        }
        else {
            res.status(204);
        }
    })
});

//perfect-member register
router.post('/register', function(req, res) {

    console.log('0');

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
        console.log('1');
    }
    Member.findOne({
        email: req.body.email
    }).then(member => {
        if(member) {
            console.log('12');
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {

            console.log('123');
           
            const newMember = new Member({
                    name: req.body.name,
                    email: req.body.email,
                    password: {
                        hash_password: req.body.password.hash_password,
                        real_password: req.body.password.real_password
                    },
                    img: req.body.img,
                    document_count: req.body.document_count,
                    subscription: {
                        offer1: req.body.subscription.offer1,
                        offer2: req.body.subscription.offer2,
                        offer3: req.body.subscription.offer3,
                        offer4: req.body.subscription.offer4,
                        offer5: req.body.subscription.offer5,
                        offer6: req.body.subscription.offer6
                    },
                    admin: req.body.admin
            });

            console.log('1234');
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newMember.password.hash_password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newMember.password.hash_password = hash;
                            newMember
                                .save()
                                .then(member => {
                                    res.json(member)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Member.findOne({email})
        .then(member => {
            if(!member) {
                errors.email = 'Member not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, member.password.hash_password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: member.id,
                                name: member.name,
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        member:member,
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
        admin:req.member.admin
    });
});

module.exports = router;