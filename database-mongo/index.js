var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, function(error) {
  if (error) {
    console.log(error);
  }
});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  userName: String,
  date: String,
  event: {}
});

var Users = mongoose.model('Users', userSchema);
module.exports = Users;
