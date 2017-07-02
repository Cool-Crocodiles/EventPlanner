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

// var eventSchema = mongoose.Schema({
//   date: String,   // unique!!!
//   events: String,
// });

//var Event = mongoose.model('Event', eventSchema);

// var selectAllEvents = function(callback) {
//   Event.find({}, function(err, events) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, events);
//     }
//   });
// };

var userSchema = mongoose.Schema({
  // userName: {type: String, unique: true},
  userName: String,
  date: String,
  event: {}
});

var Users = mongoose.model('Users', userSchema);

// var selectAllUsers = function(callback) {
//   User.find({}, function(err, users) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, users);
//     }
//   });
// };

// module.exports.selectAllEvents = selectAllEvents;
// module.exports.selectAllUsers = selectAllUsers;
module.exports = Users;
// module.exports = Event;
