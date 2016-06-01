var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
  billName: String,
  amount: Number,
  paid: {type: Boolean, default: false}
});

var Bill = mongoose.model('Bill', billSchema);



module.exports = Bill;
