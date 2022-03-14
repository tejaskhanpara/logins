var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var login = require('../Modules/userlogin'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('index');
});

router.post('/login', async function(req, res, next) {

      try{
            const email = req.body.email;
            const password = req.body.password;

            const useremail = await login.findOne({email:email})

            if(useremail.password == password){
                res.status(201).render('dashboard')
            }else{
              res.send('invalid login detail');
            }
      }catch (error) {
          res.status(400).send("invalid Detail")
      }
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', async function(req, res, next) {

      try{
        const reg = await login.create(req.body);

        res.status(201).render('index');

        // json({
        //   status:"success",
        //   data:reg
        // })
        
      }catch(error){
          
      }
});


router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

router.post('/forgot', async function(req, res, next) {

      console.log(otp);

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'khanparatejas1998@gmail.com',
          pass: 'raghu9924106241'
        }
      });
      
      var mailOptions = {
        from: 'khanparatejas1998@gmail.com',
        to: req.body.email,
        subject: 'Forget Password',
        html:"<h3>OTP For Account Verifiy is </h3>"+ "<h1>" + otp +"</h1>"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(201).render('otp');
});


router.post('/otp', async function(req, res, next) {
  
      var txtotp = req.body.txtotp;

      if(txtotp == otp){
          res.status(201).render('new_pass')
      }else{
        res.send("invalid Your Detail.....");
      }
});

router.patch('/update/:id' ,async function(req , res, next){

    res.send(req.body.Create);

    try{
      const login = await login.findByIdAndUpdate(req.params.id,req.body.Create);

      res.status(201).json({
        status:"update",
        data:login
      })
    }catch(error){

    }
});

module.exports = router;
