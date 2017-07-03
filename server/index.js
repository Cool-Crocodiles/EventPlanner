var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var helper = require('./dbHelper.js');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser());

var month;
app.post('/events', function(req, res) {
  month = '';
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

  var options = {
    url: `http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=${req.body.eventSelected}&l=${req.body.eventLocation}&when=${month}+${day}`,
    method: 'GET'

  }
  request(options, function(err, response, body){

    if(JSON.parse(body).events) {
      res.send(JSON.parse(body).events.event);
    } else res.send('Wrong Entry!');
  });
});



app.post('/selected', function(req, res) {
  helper.saveEvent(req, res);
});


app.post('/retrieve', function(req, res) {
  helper.dbLookup(req, res);
});

app.post('/delete', function(req, res) {
  helper.deleteEvent(req, res);

});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
