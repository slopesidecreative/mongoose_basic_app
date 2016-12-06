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
// use the EJS JS templating engine
app.set('view engine','ejs');

// ROUTES --------------------------------------
app.get('/', function (req, res){
  res.render('index');
});

// BEGIN listening for requests -----------------
var server = app.listen(port,function(){
   console.log('Listening on port %d',port);
});

var count = 0;

// SOCKET IO CONNECTIONS -------------------------
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
   // pass the current count when the user connects
   data = { count: count };
   socket.emit('server_update', data);

  socket.on("button_clicked", function (data){
      console.log(socket.id);
      // pass thru the data sent by the form
      count += 1;
      var data = {
         count: count
      };
      io.emit('server_update', data);
  })
  socket.on("reset_count", function (data){
   console.log(socket.id);
      count = 0;
      var data = {
         count: count
      };
      io.emit('server_update', data);
  })
 })
