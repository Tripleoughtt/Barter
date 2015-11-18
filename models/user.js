"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');
var User;



var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  trades: [ { type: Schema.Types.ObjectId, ref: 'Trade' } ],
  items: [ {type: Schema.Types.ObjectId, ref: 'Item'} ]
})

userSchema.statics.register = function(user, cb) {
  var username = user.username;
  console.log('Hashing Password')
  var password = jwt.encode(user.password, process.env.JWT_SECRET);
  console.log('Password Hashed: ', password)
  User.findOne({username: username}, function(err, user){
    console.log('No user found')
    if(err || user) return cb(err || "Username already taken. Sorry.");
    var newUser = new User;
    newUser.username = username;
    newUser.password = password;
    console.log("This is new user: ", newUser)
    newUser.save(function(err, savedUser){

      savedUser.password = null;

      cb(err, savedUser)
    })
  })
}

User = mongoose.model('User', userSchema)

module.exports = User;


