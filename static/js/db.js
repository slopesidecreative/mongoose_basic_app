
var mongoose = require('mongoose');
var db = 'mongodb://localhost/basic_mongoose';

mongoose.connect(db,function(){
   console.log('mongoose connected');
});

var UserSchema = new mongoose.Schema({
 name: String,
 age: {type: Number}
});

// mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
// var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
// module.exports = User;
// Instead, do this...
module.exports = mongoose.model('user',UserSchema);
