const express = require('express');
const router = express.Router();
const logger = require('morgan')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const Document = require('../models/Document');
var fileName;
var directory;

router.use(logger('dev'))
router.use(cors())
router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)



const Compute = (d1,d2)=>{
 let month = (d2.getFullYear() - d1.getFullYear()) * 12
     month -= d1.getMonth()+1
     month +=d2.getMonth()
     return month <=0?0:month
}

router.use(fileUpload())
router.use('/public', express.static(__dirname + '/public'))
router.use(function(req, res, next){
    if(req.path.includes('/document')){
        console.log('_________________INTERCEPTION START_______________')
        const User = require('./../models/Member')
        const {dentist_id:_id} = req.body
        User.findOne({_id}, (err,data)=>{
            if(data){
                const {email:userId} = data
                  const Subscription = require('./../models/Subscription')
                      Subscription.find({userId},(err,data)=>{
                          const moment = require('moment')
                          if(data.length > 1){
                            // has many subscription
                            for (const sub of data) {

                            }

                          }else{
                            // has one subscription
                            const [s] = data;
                            const {_id, available} = s;
                            //console.log(s)
                            const a = available > 0 ? available-1:0
                            Subscription.updateOne({_id},{available:a}).then(
                                data=>console.log(data)
                            )
                            
                          }
                      })  
            }
        })
        
        console.log('_________________INTERCEPTION END_________________')
    }
    next()
})


router.get('/', function(req,res){
  Document.find(function(err, documents){
      if(err) return res.status(500).send({error: 'database failure'});
      console.log(documents)
      res.json(documents);
  })
});

router.get('/align/remarks/:name', function(req,res){
    Document.findOne({_id:req.params.name},{'remarks': true, '_id' : false}, function(err, document){
      if(err){
        res.status(500).json({ code:'500',message:'fail',error: err });
      }else if(!document){
          res.status(404).json({code:'404',message:'fail',error:"Not Found document!-requested resource is not available now" });
      }
      else {
          res.status(200).json(document);
      }
  })
});

router.get('/:dentist_id', function(req, res){
  Document.find({dentist_id: req.params.dentist_id}, function(err, dentist){
      if(err) return res.status(500).json({error: err});
      if(!dentist) return res.status(404).json({error: 'Dentist not found'});
      res.json(dentist);
  })
});

router.get('/operator/:name', function(req, res){
  Document.find({operator_id: req.params.name }, function(err, dentist){
      if(err) return res.status(500).json({error: err});
      if(!dentist) return res.status(404).json({error: 'Dentist not found'}); 
      res.json(dentist);
  })
});

router.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  fileName = req.files.file.name

  uploadFile.mv(
    `public/files/${fileName}`,
    function (err) {

      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
        Directory:`http://localhost:5000/files/${req.files.file.name}`,
        fileName:req.files.file.name
      })

      directory = 'http://localhost:5000/files/' + fileName;  
    },
  )

})

router.post('/document', function(req, res){

  /*
  var document = new Document(req.body);
  document.directory = directory;
  document.Filename = fileName;
  document.save(function(err){
        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        } else {
            console.log(document)
            res.status(201).json({ code:'201',message:'success - new pay Document is created',data:req.body });
        }
    });
  */

    res.json({message:'under construction'})
});


router.post('/archive', function(req, res){
  var document = new Document(req.body);
  document.directory = directory;
  document.Filename = fileName;
  document.save(function(err){
        if(err){
            res.status(500).json({ code:'500',message:'fail',error: err });
        } else {
            console.log(document)
            res.status(201).json({ code:'201',message:'success - new pay Document is created',data:req.body });
        }
    });
});



router.post('/archive/:name', function(req, res){

  // document.directory = directory;
  // document.Filename = fileName;
 
  Document.updateOne({ _id: req.params.name }, {
        archived:false
       }, function(err, member){
     if(err){
         res.status(500).json({ code:'500',message:'fail',error: err });
     }else if(!member){
         res.status(400).json({code:'404',message:'fail',error:"Not Found Member" });
     }
     else {
         res.status(200).json({ code:'200',message:'success',data:req.body });
     }
   })
   });



router.post('/insertremark/:name', function(req, res){

 // document.directory = directory;
 // document.Filename = fileName;

 Document.updateOne({ _id: req.params.name }, {
    $push: {remarks : req.body}
      }, function(err, member){

    if(err){
        res.status(500).json({ code:'500',message:'fail',error: err });
    }else if(!member){
        res.status(400).json({code:'404',message:'fail',error:"Not Found Member" });
    }
    else {
        res.status(200).json({ code:'200',message:'success',data:req.body });
    }
  })
  });

  router.put('/update/:name', function(req, res){
   
    Document.updateOne({ _id: req.params.name }, {
       $set: req.body }, function(err, member){
   
       if(err){
           res.status(500).json({ code:'500',message:'fail',error: err });
       }else if(!member){
           res.status(400).json({code:'404',message:'fail',error:"Not Found Document" });
       }
       else {
           res.status(200).json({ code:'200',message:'success',data:req.body });
       }
     })
     });

module.exports = router;
