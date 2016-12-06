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
/* POST
   /items
   Create a new item based on form submission.
*/
app.post('/items', function (req, res){
   console.log('Create: action');
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
/* GET
   /items
   Form for creating a new item.
*/
app.get('/items', function (req, res){
   console.log('Create: form.');
   // var item = new Item({
   //    name: req.body.name,
   //    age: req.body.age
   // });
   // item.save(function(err){
   //    if(err){
   //       console.log('error ${err}');
   //    }
   //    res.redirect('/');
   // })
   res.render('items');
});

/* GET
   /items/:id
   View a single item by ID.
*/
app.get('/items/:id', function (req, res){
   console.log('A single item by ID %d', req.params.id);
   Item.findOne(
      {
         _id: req.params.id
      },
      function(err, data) {
      if(err){
         console.log('error ${err}');
      }else{
         res.render('items',{ items: { data } });
      }
   })
});
/* POST
   /items/:id
   Process editing an item by ID.
*/
app.post('/items/update', function (req, res){
   // pass the _id using hidden field in form
   console.log('Process editing an by ID %d', req.params._id);
   // another way to update a record
   Item.findOne({_id: req.body._id}, function(err, item){
    item.name = req.body.name;
    item.age = req.body.age;
    item.save(function(err){
      if(err){
         console.log('error updating ${err}');
         }else{
         res.redirect('/');
            }
      })
   })
});

/* GET
   /items/edit/:id
   Form to edit an item by ID.
*/
app.get('/items/update/:id', function (req, res){
   console.log('A single item by ID %d', req.params.id);
   Item.findOne(
      {
         _id: req.params.id
      },
      function(err, data) {
      if(err){
         console.log('error ${err}');
      }else{
         var queryString = 'edit'
         res.render('update',{ items: { data } });
      }
   })
});





// BEGIN listening for requests -----------------
var server = app.listen(port,function(){
   console.log('Listening on port %d',port);
});
