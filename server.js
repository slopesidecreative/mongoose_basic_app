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

// our connection to the User model via Mongoose
var Item = require('./static/js/db.js');



// GET '/' Displays all of the mongooses.
// GET '/mongooses/:id' Displays information about one mongoose.
// GET '/mongooses/new' Displays a form for making a new mongoose.
// POST '/mongooses' Should be the action attribute for the form in the above route (GET '/mongooses/new').
// GET '/mongooses/edit/:id' Should show a form to edit an existing mongoose.
// POST '/mongooses/:id' Should be the action attribute for the form in the above route (GET '/mongooses/edit/:id').
// POST '/mongooses/destroy/:id' Should delete the mongoose from the database by ID.


// ROUTES --------------------------------------

// "/"
// Root - show all
app.get('/', function (req, res){
   Item.find({}, function(err, data) {
      if(err){
         console.log('error ${err}');
      }else{
         res.render('index',{items:data});
      }
   })
});

/*
/items/:id
A single item by ID
*/
app.get('/items/:id', function (req, res){
   console.log('A single item by ID %d', req.params.id);
   User.findOne({
      $eq: {
         id:req.params.id
      }
   }, function(err, data) {
      if(err){
         console.log('error ${err}');
      }else{
         res.render('index',{ items: data });
      }
   })
});


app.post('/items', function (req, res){
   console.log('Create a new item.');
   var item = new Item({
      name: req.body.name,
      age: req.body.age
   });
   item.save(function(err){
      if(err){
         console.log('error ${err}');
      }
      res.redirect('/');
   })
});

// BEGIN listening for requests -----------------
var server = app.listen(port,function(){
   console.log('Listening on port %d',port);
});
