'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')

var User = require('../models/user');
var Item = require('../models/item');
var Trade = require('../models/trade');

router.get('/', function(req, res, next) {
  res.render('trading/trading');
});

router.post('/newTrade', (req, res) => {
  Trade.newTrade(req, function(err, savedTrade) {
    if (err) return console.error(err);
    console.log(savedTrade);
  })
})

router.post('/makeTrade', (req, res) => {
  Trade.findById(req.body._id, (err, trade) => {
    trade.makeTrade(trade, (err, tradeComplete) => {
      if (err) return console.error(err);
      console.log(tradeComplete);
      Trade.findByIdAndRemove(req.body._id), (err, removedTrade) => {
        if (err) return console.error(err);
        console.log(removedTrade);
        res.send(tradeComplete)
      }
    })
  }) 
})

router.post('/addItem', (req, res) => {
  var item = new Item(req.body.item);
  console.log(item)
  var payload = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  console.log(payload.username)
  Item.find({itemName: req.body.name, owner: payload._id}, (err, item) => {
    if (err || item) return res.send(err || 'you already own this item')
  })
  item.owner = payload._id
  item.itemName = req.body.name
  console.log(payload._id)
  item.save(function(err, savedItem){
    if(err) return console.log(err)
    console.log(savedItem)
    res.send(savedItem)
  })
})

module.exports = router;
