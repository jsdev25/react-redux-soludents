const express = require('express');
nodeMailer = require('nodemailer');

const router = express.Router();
const Email = require('./../models/Email');
const mailer = require('nodemailer')
const mailConfig = require('./../models/constants/email')


const Mail = config => options => callback => {
    let connection =  mailer.createTransport({
     host:'smtp.gmail.com',
     port:587,
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
  
const MailerWithConfig = Mail(mailConfig);


router.post('/send', function (req, res) {
        const {html,email} = req.body
        MailerWithConfig(
            {
                from: email, // sender address
                to: "ishendrapratap@gmail.com",
                subject: `You have recieved query from ${email}`,
                html:`
                <b>
                ${html}
               </b>
                `                                
            }
        )(
            (success) => {
                var email = new Email({html,email,password:"******"})
                    email.save().then(
                        d => res.json({message:'mail sent successfully'})
                    )
            }
        )
    /* let transporter = nodeMailer.createTransport({
  
        service: "gmail",
        auth: {
            user: req.body.user,
            pass: req.body.pass
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    let mailOptions = {
        from: req.body.user, // sender address
        to: 'support@soludents.com',
        subject: "Report",
        text: "",
        html: req.body.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           res.status(500).json({ code:'500',message:'fail',error: error });
           return console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).json({ code:'200',message:'success'});
        }
    });

    //     var email = new Email(req.body);
    //     email.save(function(err){
    //           if(err){
    //               res.status(500).json({ code:'500',message:'fail',error: err });
    //           } else {
    //               res.status(201).json({ code:'201',message:'success - Email Sented',data:req.body });
    //           }
    //       }); */
});


module.exports = router;
