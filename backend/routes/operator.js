const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const Operator = require('../models/Operator');

router.get('/', function(req,res){
    Operator.find(function(err, operators){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(operators);
    })
  });

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Operator.findOne({
        email: req.body.email
    }).then(operator => {
        if(operator) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
          
            const newUser = new Operator({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                real_password: req.body.password,
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
                                .then(operators => {
                                    res.json(operators)
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

    Operator.findOne({email})
        .then(operator => {
            if(!operator) {
                errors.email = 'Operator not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, operator.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: operator.id,
                                name: operator.name,
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`,
                                        operator:operator,
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
        id: req.operator.id,
        name: req.operator.name,
        email: req.operator.email,
        admin:req.operator.admin
    });
});

module.exports = router;