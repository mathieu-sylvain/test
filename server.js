var express = require('express');

// Custom imports
var fetcher = require('./scrapper');


// Server creation
var appServer = express();

// Create gitrepo which is available for open shift in a nodejs app
// Deploy to open-shift


// https://hackernoon.com/the-programmers-guide-to-booking-a-plane-11e37d610045
// https://ms-scrapper-mathieu-sylvain.c9users.io:8080/fetch/all
// https://ms-scrapper-mathieu-sylvain.c9users.io:8080/fetch/carcassonne
// https://ide.c9.io/mathieu_sylvain/node-prediction

// DB .mongolab.com


const fetchHandler = (req, res) => {
  fetcher.fetch(req.params.title);
  res.send("Fetch handled");
}

// Server route definitions
appServer.get('/fetch/:title', fetchHandler);

appServer.get('/', function (req, res) {
  res.send('GET request to the homepage');
});


var server = appServer.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
