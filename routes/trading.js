'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')
var authMiddleware = require('../config/auth')
var User = require('../models/user');
var Item = require('../models/item');
var Trade = require('../models/trade');

router.get('/', authMiddleware, function(req, res, next) {
  var payload = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  var data = {}
  data.currentUser = payload.username
  Item.find({owner: payload._id}, (err, myItems) => {
    data.myItems = myItems;
    Item.find({forTrade: true , owner: {$ne : payload._id}}, (err, publicItems) => {
      data.publicItems = publicItems;
      Trade.find({$or: [{requestingUser: payload._id},
        {respondingUser: payload._id}]}, (err, pendingTrades) => {
          data.pendingTrades = pendingTrades
          console.log('pending trades ', data)
          res.render('trading/trading', {data: data});
        }).populate('requestingUser respondingUser requestedItem responseItem', "username itemName")
    }).populate('owner', 'username')
  })
});

router.post('/newTrade', (req, res) => {
  Trade.newTrade(req, res, function(err, savedTrade) {
    if (err) return console.error(err);
    console.log('saved trade in route ', savedTrade);
  })
})

router.post('/makeTrade', (req, res) => {
  Trade.findById(req.body._id, (err, trade) => {
    trade.makeTrade(trade, (err, tradeComplete) => {
      if (err) return console.error(err);
      Trade.findByIdAndRemove(req.body._id, (err, removedTrade) => {
        if (err) return console.error(err);
        console.log('removed trade: ', removedTrade);
        res.send(tradeComplete)
      })
    })
  }) 
})

router.post('/notForTrade', (req, res) => {
  var payload = jwt.decode(req.cookies.token, process.env.JWT_SECRET);
  Item.find({itemName: req.body.itemName, owner: payload._id}, (err, foundItem) => {
    if (err) return console.error(err);
    Item.findByIdAndUpdate(foundItem[0]._id, {$set: {forTrade: !foundItem[0].forTrade}}, (err, updatedStatus) => {
      if (err) return console.error(err);
      res.send(updatedStatus);
    })
  })
})

router.post('/deleteTrade', (req, res) => {
  Trade.findByIdAndRemove(req.body._id, (err, removedTrade) => {
    res.send(removedTrade)
  })
})

router.post('/removeItem', (req, res) => {
  var payload = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  Item.find({owner: payload._id, itemName: req.body.itemName}, (err, foundItem) => {
    Item.findByIdAndRemove(foundItem[0]._id, (err, removedItem) => {
      console.log('removed item ', removedItem)
      res.send(removedItem);
    })
  })
})

router.post('/addItem', (req, res) => {
  var item = new Item(req.body.item);
  var payload = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  Item.find({itemName: req.body.name, owner: payload._id}, (err, item) => {
    if (err || item[0]) return res.send(err || 'you already own this item')
  })
  item.owner = payload._id
  item.itemName = req.body.name
  item.save(function(err, savedItem){
    if(err) return console.log(err)
      console.log('saved item: ', savedItem)
    res.send(savedItem)
  })
})

module.exports = router;