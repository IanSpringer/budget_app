var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var cookieParser = require('cookie-parser')
var port = process.env.PORT || 3000;
var logger = require('morgan');
var path = require('path');
var db = require('./db.js')
var billsController = require('./controllers/bills_controller.js')
var depositController = require('./controllers/deposit_controller.js')


app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.get('/deposits', function(req, res){
  res.sendFile(path.join(__dirname + '/views/deposits.html'))
})

app.get('/summary', function(req, res){
  res.sendFile(path.join(__dirname + '/views/summary.html'))
})



app.route('/api/bills')
  .get(billsController.index)
  .post(billsController.create)

app.route('/api/bills/:id')
  .delete(billsController.destroy)
  .put(billsController.update);

app.route('/api/deposits')
  .get(depositController.index)
  .post(depositController.create)

app.route('/api/deposits/:id')
  .delete(depositController.destroy)





app.listen(port, function(){
  console.log('Listening on port' + port)
})
