'use strict'; 

let mongoose = require('mongoose');
let jwt = require('jwt-simple');
let User = require('./user')
let Item = require('./item')
let Schema = mongoose.Schema;
let Trade;

let tradeSchema = mongoose.Schema({
  requestingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  respondingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  requestedItem: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
  responseItem: {type: Schema.Types.ObjectId, ref: 'Item', required: true}
  
});

tradeSchema.statics.newTrade = (req, cb) => {
  let trade = new Trade();
  let tradeInfo = req.body.trade
  let payload = jwt.decode(req.body.token, process.env.JWT_SECRET)
  User.find({"username": tradeInfo.respondingUser}, function(err, respondingUser){
    trade.respondingUser = respondingUser[0]._id;
    trade.requestingUser = payload._id;
    console.log('trade again', trade);

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
}

tradeSchema.methods.makeTrade = (trade, cb) => {
  console.log('initial trade: ', trade)
  Item.findByIdAndUpdate(trade.requestedItem, {$set: {owner: trade.requestingUser}}, (err, requestMatch) => {
    if (err) return console.error(err);
    console.log(requestMatch);
    Item.findByIdAndUpdate(trade.responseItem, {$set: {owner: trade.respondingUser}}, (err, responseMatch) => {
      if (err) return console.error(err);
      console.log(responseMatch);
      cb(err, [requestMatch, responseMatch]);
    })
  })
}


Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;

















