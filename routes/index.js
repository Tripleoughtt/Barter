var express = require('express');
var router = express.Router();
var User = require('../models/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});



router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/')
})

router.post('/login', function(req, res){
  User.authenticate(req.body, function(err, user){
    if(err || !user) res.status(400).send(err);
    else {
    console.log ('Success!');
    
    var token = user.token(user);
    res.cookie('token', token);
    res.redirect('/trading')
    }
  })
});

router.post('/register', function(req, res){
  console.log('Hello Registration')
  User.register(req.body, function(err, savedUser){
    if (err) return console.log(err);
    console.log(savedUser)
    res.status(err ? 400 : 200).send( err || savedUser );
  })
});

module.exports = router;
