const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");
const path = require("path");
const  Subscription = require('./models/Subscription')
const documents = require("./routes/document");
const members = require("./routes/member");
const histories = require("./routes/history");
const emails = require("./routes/email");
const mailer = require('nodemailer')
const mailConfig = require('./models/constants/email')
const Member = require('./models/Member')
//This is stripe mode.
const stripe = require("./models/constants/stripe");

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

const app = express();
app.use(passport.initialize());
require("./passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public/client/build")));
app.use("/api/documents", documents);
app.use("/api/members", members);
app.use("/api/histories", histories);
app.use("/api/emails", emails);
app.use((req,res,next)=>{
    //console.log(req)
    next()
})

// app.get('/', function(req, res) {
//     res.send('hello');
// });

//////////////This is stripe test mode////////////////

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
   },
   debug:true
   })

   connection.sendMail(options, (error, info) => {
       if (error) {
       //    res.status(500).json({ code:'500',message:'fail',error: error });
          return console.log(config);
       } else {
           console.log('Message %s sent: %s', info.messageId, info.response);
           callback(info);
           // res.status(200).json({ code:'200',message:'success'});
       }
   })

} 

const MailerWithConfig = Mail(mailConfig);

app.get('/api/subscriptions/:email', (req,res)=>{
  Subscription.find({userId:req.params.email},(err, data)=>{
    if(!err){
      res.json(data)
    }
  })
})

const getUserDetailsByEmail = (email) =>{
  return new Promise(
    (resolve,reject)=>{
      Member.findOne({email},(err,data)=>{
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    }
  )
}

app.get('/api/get_users',(req,res)=>{
  const UserWithSubscription = (user) => {
    const {email} = user
    return new Promise((resolve,reject)=>{
        Subscription.findOne({userId:email},(err,res)=>{
          if(!err){
            const {active} = res || {active:'---'}
            console.log(res)
            resolve({...user,active})}
          else
            resolve(user)
        })
    })
  }

  Member.find((err,data)=>{
    if(!err){
        const users = Promise.all(data.filter(({admin})=> admin ==0).map(
          ({email,name,lastname})=> UserWithSubscription({email,name,lastname}).then(data=>data)
        ))

        users.then(files=>{
          res.json(files)
        })
          
      }
    else
      res.json({'message':'Some error occured'})
 })
})

app.post('/api/subscription/cancel/:id', (req,res)=>{
  const {id} = req.params
  const {OfferNumber,userId} = req.body
  stripe.subscriptions.del(id,(err,response)=>{
    if(!err)
      Subscription.updateOne({subscriptionId:id},{active:false},(err)=>{
        if(!err){
          getUserDetailsByEmail(userId).then(
            ({name,lastname}) =>{
              console.log({name,lastname})
              MailerWithConfig({
                from: 'info@soludents.com', // sender address
                to: userId,
                subject: 'Soludents: Your subscription has been cancelled',
                html:`
                <b>
                Hello, ${name} ${lastname || ""},
                Your subscription ${ id } based on the ${ OfferNumber } has been successfully cancelled.
                Best regards, Soludents team
               </b>
                `                                
            })(
              rs=> res.json({message:'Your subscription has been cancelled'})
            )
            }
          )
          
        }
          
      })
    else
      res.json({message:'Some Error has been Occured'})
  })
})


app.post("/api/stripe", (req, res) => {
  //stripe.charges.create(req.body, postStripeCharge(res));

  const {planId,source,email,subscription} = req.body

  stripe.customers.create({
    description: `Customer for ${email}`,
    source,
    email
  }, function(err, {id}) {
      console.log(` customer is created with ${id}`)
        stripe.subscriptions.create({
          customer:id,
          items: [
            {
              plan: planId,
            },
          ]
        }, function(err, sub) {
          if(err){
            res.json({message:`Some error has occured while in between transaction`})
          }else{
            const {customer,id,current_period_end:end,current_period_start:start} = sub
            //console.log({sub,subscription,email,customer,id,start,end})
             const s = new Subscription({
              start,
              end,
              userId:email,
              customerId:customer,
              subscription,
              subscriptionId:id,
            })

            s.save().then(
              ss => {
                getUserDetailsByEmail(email).then(
                  ({name,lastname})=> {
                    MailerWithConfig({
                        from: 'info@soludents.com', // sender address
                        to: email,
                        subject: 'Soludents: Your subscription has been processed',
                        html: `
                        <b>
                        Hello, ${name} ${lastname || ""}, Your subscription ${id} based on the ${ subscription.Offernumber } has been processed and confirmed.Best regards, Soludents team  
                        </b>
                        `                                
                    })(
                      rs=> res.json({message:`subscription added successfully`})
                    )
                  }
                )
                
              }
            )
          }
          })
  });


});

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

app.get('/emails/test/:email',(req,res)=>{
  getUserDetailsByEmail(req.params.email).then(
    data => res.json(data)
  ).catch(
    err=> res.json({error:JSON.stringify(err)})
  )
})
//////////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(`PATH`, path.dirname(require.main.filename));
});
