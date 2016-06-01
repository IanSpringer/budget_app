var mongoose = require('mongoose');

var depositSchema = new mongoose.Schema({
  deposit: Number,
  date: {type: Date, default: new Date()}

});



var Deposit = mongoose.model('Deposit', depositSchema);


module.exports = Deposit;
