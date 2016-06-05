var Bill = require('../models/bill_model.js')
var controller = {};
var path = require('path')

controller.index = function(req, res){
  Bill.find({}, function(err, bill){
    if (err) {
      throw err;
    }
    res.json(bill)
  })
}

controller.new = function(req, res){
  res.sendFile(path.join(__dirname + '/views/index.html'))
}

controller.create = function(req, res){
  var bill = new Bill({
    billName: req.body.billName,
    amount: req.body.amount,
    paid: req.body.paid
  })
  bill.save(function(err, bill){
    if (err) throw err;
    res.redirect('/')

  })
}

controller.update = function(req, res){
  var id = req.params.id;
  Bill.findById(id, function(err, bill){
    if(err){
      throw err;
    }
    if(bill.paid){
      var billName = req.body.billName;
      var amount = req.body.amount;
      var paid = req.body.paid;

      Bill.findOneAndUpdate(
        {_id: id},
        {paid: false},
         function(err, bill){
          if (err) {
            throw err;
          }
          res.json(bill)
          // res.redirect('/')
         });
    }else{
      Bill.findOneAndUpdate(
        {_id: id},
        {paid: true},
        function(err, bill){
        if (err) {
          throw err;
        }
         res.json(bill)
         // res.redirect('/')
        });

      }
    })
  }



controller.destroy = function(req, res){
  var id = req.params.id;
  console.log(req.body, req.params);
  Bill.findOneAndRemove({_id: id}, function(err, doc, result){
    if (err){
      console.log(err);
    }
    console.log(err, doc, result);
    res.json(result);
  });

};

module.exports = controller;
