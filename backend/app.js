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

// app.get('/', function(req, res) {
//     res.send('hello');
// });

//////////////This is stripe test mode////////////////


app.get('/api/subscriptions/:email', (req,res)=>{
  Subscription.find({userId:req.params.email},(err, data)=>{
    if(!err){
      res.json(data)
    }
  })
})


app.post('/api/subscription/cancel/:id', (req,res)=>{
  const {id} = req.params
  stripe.subscriptions.del(id,(err,response)=>{
    if(!err)
      Subscription.deleteOne({subscriptionId:id}, (err)=>{
        if(!err)
          res.json({message:'Your subscription has been cancelled'})
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
            console.log(err)
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
                console.log(ss);
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
//////////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log(`PATH`, path.dirname(require.main.filename));
});
