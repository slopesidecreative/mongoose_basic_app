
var mongoose = require('mongoose');
var db = 'mongodb://localhost/basic_mongoose';

mongoose.connect(db,function(){
   console.log('mongoose connected');
});

var ItemSchema = new mongoose.Schema({
 name: String,
 age: {type: Number}
});

module.exports = mongoose.model('item',ItemSchema);
