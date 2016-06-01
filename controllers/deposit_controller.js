var Deposit = require('../models/deposit_model.js')
var controller = {};
var path = require('path')

controller.index = function(req, res){
  Deposit.find({}, function(err, deposit){
    if (err) {
      throw err;
    }
    res.json(deposit)
  })
}

controller.new = function(req, res){
  res.sendFile(path.join(__dirname + '/views/index.html'))
}

controller.create = function(req, res){
  var deposit = new Deposit({
    deposit: req.body.deposit,
    date: req.body.date
  })
  deposit.save(function(err, deposit){
    if (err) throw err;
    res.redirect('/')

  })
}

controller.destroy = function(req, res){
  var id = req.params.id;
  console.log(req.body, req.params);
  Deposit.findOneAndRemove({_id: id}, function(err, doc, result){
    if (err){
      console.log(err);
    }
    console.log(err, doc, result);
    res.json(result);
  });

};

module.exports = controller
