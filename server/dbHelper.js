const Users = require('../database-mongo/index.js');
// const Event = require('../database-mongo/index.js/Event');
// const request = require('request');


exports.dbLookup = (req, res) => {
  //{userName: req.body.userName}

  //take care of if userName does not exists! 
  Users.find({userName: req.body.userName}).sort({date: 1}).exec((err, result) => {
    if (err) {
      throw err;
    }
    console.log("********** DB LOOKUP RESULT: ", result);
    res.send(result);
  });
};

exports.saveEvent = (req, res) => {
  console.log("*********called function saveEvents!!! : ", req.body);
  var userObj = {
    userName: req.body.userName,
    date: req.body.saveDate,
    event: req.body.saveSelection  //no stringify! fixed
  };
  Users.create(userObj, (err, event) => {
    if (err) {
      console.log(err);
    }
    res.send('******Got /selected request and Successfully saved in DB ****');
  });
};

exports.deleteEvent = (req, res) => {
  //JSON.parse(req.body.selectDates);
  console.log("********* in deleteEvents function!!! userName: ", req.body.event.userName);
  console.log("********* in deleteEvents function!!! date: ", req.body.event.date);
  console.log("********* in deleteEvents function!!! ??? id: ", req.body.event['_id']);


  Users.remove({userName: req.body.event.userName, date: req.body.event.date, _id: req.body.event['_id']}).exec((err, result) => {
    if(err) {
      throw err;
    }
    //console.log("************** deleteEvents: ", result);
    res.send('Deleted Successfully!');
  });
};




