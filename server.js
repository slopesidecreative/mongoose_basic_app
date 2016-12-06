var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8000;


// for parsing the POST body
app.use(bodyParser.urlencoded({extended: true}));
// set the static directory
app.use(express.static(__dirname + '/static'));
// set the views directory
app.set('views', __dirname + '/views');
// set EJS as the templating engine
app.set('view engine','ejs');

// our connection to the Users model via Mongoose
var User = require('./static/js/db.js');


// ROUTES --------------------------------------
app.get('/', function (req, res){
  res.render('index');
});

app.post('/users', function (req, res){
   var user = new User({
      name: req.body.name,
      age: req.body.age
   });
   user.save(function(err){
      if(err){
         console.log('error ${err}');
      }
   })
  res.render('index');
});

// BEGIN listening for requests -----------------
var server = app.listen(port,function(){
   console.log('Listening on port %d',port);
});
