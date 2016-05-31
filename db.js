var mongoose = require('mongoose');
var mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/budget_app';

mongoose.connect(mongo_uri, function(err) {
  if(err) {
    console.log("cannot connect to database, sucka", err);
  } else {
    console.log("database connected, playa");
  }
  var db = mongoose.connection;
});

module.exports = mongoose;
