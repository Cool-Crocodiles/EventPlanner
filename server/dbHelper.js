const Users = require('../database-mongo/index.js');


exports.dbLookup = (req, res) => {

  Users.find({userName: req.body.userName}).sort({date: 1}).exec((err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
};

exports.saveEvent = (req, res) => {
  var userObj = {
    userName: req.body.userName,
    date: req.body.saveDate,
    event: req.body.saveSelection
  };
  Users.create(userObj, (err, event) => {
    if (err) {
      console.log(err);
    }
    res.send('******Got /selected request and Successfully saved in DB ****');
  });
};

exports.deleteEvent = (req, res) => {
  Users.remove({userName: req.body.event.userName, date: req.body.event.date, _id: req.body.event['_id']}).exec((err, result) => {
    if(err) {
      throw err;
    }
    res.send('Deleted Successfully!');
  });
};
