var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8000;

// for parsing the POST body
app.use(bodyParser.urlencoded({extended: true}));
// set the static directory
app.use(express.static(__dirname + '/static'));
// set the views directory
app.set('views', __dirname + '/views');
// set EJS as the templating engine
app.set('view engine','ejs');
// connect to MongoDB
mongoose.connect('mongodb://localhost/basic_mongoose',function(){
   console.log('mongoose connected');
});


// ROUTES --------------------------------------
app.get('/', function (req, res){
   data = [{
      name: "erik",
      age: "10"
   }];
  res.render('index',{users: data});
});

// BEGIN listening for requests -----------------
var server = app.listen(port,function(){
   console.log('Listening on port %d',port);
});
