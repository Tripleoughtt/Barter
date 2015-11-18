'use strict'; 

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Trade;

let tradeSchema = mongoose.Schema({
  requestingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  respondingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  requestedItem: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
  responseItem: {type: Schema.Types.ObjectId, ref: 'Item', required: true}
  
});

Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
