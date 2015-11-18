var express = require('express');
var router = express.Router();
var User = require('../models/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
