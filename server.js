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

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
appServer.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);