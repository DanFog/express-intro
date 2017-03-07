var express = require('express');
var app = express();
var logger = require('./logger');
var blocks = require('./server/api/blocks/blocks');
var locations = require('./server/api/locations/locations');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/express-intro');

app.use(logger);
app.use(express.static('public'));

app.use('/blocks', blocks);
app.use('/locations', locations);

app.listen(3000, function() {
    console.log("listening on port 3000");
});
