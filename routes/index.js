var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/trading', function(req, res, next) {
  res.render('trading/trading');
});

module.exports = router;
