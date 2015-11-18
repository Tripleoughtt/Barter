'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')

var User = require('../models/user');
var Item = require('../models/item');
var Trade = require('../models/trade');

router.post('/newTrade', (req, res) => {
  var trade = new Trade();
  var tradeInfo = req.body.trade
  var payload = jwt.decode(req.body.token, process.env.JWT_SECRET)
  User.find({"username": tradeInfo.respondingUser}, function(err, respondingUser){
    trade.respondingUser = respondingUser[0]._id;
    trade.requestingUser = payload._id;

    Item.find({owner: trade.requestingUser, itemName: tradeInfo.offeredItem}, function(err, itemForTrade){
      trade.responseItem = (itemForTrade[0]._id);

      Item.find({owner: trade.respondingUser, itemName: tradeInfo.requestedItem}, function(err, desiredItem){
        console.log(desiredItem)
        trade.requestedItem = desiredItem[0]._id;
        console.log(trade)
        trade.save((err, savedTrade) => {
          console.log(savedTrade);
        })
      })
    })
  })
})

router.post('/addItem', (req, res) => {
  var item = new Item(req.body.item);
  console.log(item)
  var payload = jwt.decode(req.body.token, process.env.JWT_SECRET)
  console.log(payload.username)
  item.owner = payload._id
  item.itemName = req.body.item.name
  console.log(payload._id)
  item.save(function(err, savedItem){
    if(err) return console.log(err)
    console.log(savedItem)
    res.send(savedItem)
  })
})

module.exports = router;
