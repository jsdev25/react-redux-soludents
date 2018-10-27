const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const Admin = require('../models/Admin');

router.get('/', function(req,res){
    Admin.find(function(err, admins){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(admins);
    })
  });

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Admin.findOne({
        email: req.body.email
    }).then(admin => {
        if(admin) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
          
            const newUser = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                real_password: req.body.password,
                avatar : "https://steemitimages.com/DQmTe5pSg7EvmBaeX1ncmaLr8hHevdCPZ6fbBV6Dcf5tszb/admin.png"
                });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(admins => {
                                    res.json(admins)
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

    Admin.findOne({email})
        .then(admin => {
            if(!admin) {
                errors.email = 'admin not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, admin.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: admin.id,
                                name: admin.name,
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        admin:admin,
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
        id: req.admin.id,
        name: req.admin.name,
        email: req.admin.email,
        admin:req.admin.admin
    });
});

module.exports = router;