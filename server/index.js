var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var helper = require('./dbHelper.js');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
var month;
app.post('/events', function(req, res) {
  month = '';
  console.log("****************req.body:  ", req.body);
  console.log("Post request Got !!! ");
  switch (req.body.eventDate.slice(0, 2)) {
    case '01':
        month = "January";
        break;
    case '02':
        month = "February";
        break;
    case '03':
        month = "March";
        break;
    case '04':
        month = "April";
        break;
    case '05':
        month = "May";
        break;
    case '06':
        month = "June";
        break;
    case '07':
        month = "July";
        break;
    case '08':
        month = "August";
        break;
    case '09':
        month = "September";
        break;
    case '10':
        month = "October";
        break;
    case '11':
        month = "November";
        break;
    case '12':
        month = "December";
        break;
  }

  var day = req.body.eventDate.slice(3);
  console.log("**********day ", day);
  console.log("**********month ", month);
  console.log("******** %%%my url: ", `http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=${req.body.eventSelected}&l=${req.body.eventLocation}&when=${month}+${day}`);

  var options = {
    url: `http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=${req.body.eventSelected}&l=${req.body.eventLocation}&when=${month}+${day}`,
    method: 'GET'

      //http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=concerts&l=las+vegas&when=July+4
  }
  request(options, function(err, response, body){

    if(JSON.parse(body).events) {
      console.log("******* API response.body", JSON.parse(body).events.event);
      res.send(JSON.parse(body).events.event);
    } else res.send('Wrong Entry!');
  });
});



app.post('/selected', function(req, res) {
  console.log("**************** /selected req.body.userName:  ", req.body.userName);
  // res.send('Got /selected request');
  helper.saveEvent(req, res);
});


app.post('/retrieve', function(req, res) {
  console.log("****************req.body:  ", req.body);
  helper.dbLookup(req, res);
});

app.post('/delete', function(req, res) {
  console.log("********* /delete : ", req.body);
  helper.deleteEvent(req, res);

});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
