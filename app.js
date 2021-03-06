var express = require('express');
var app = express();
var logger = require('./logger');
var blocks = require('./routes/blocks');
var locations = require('./routes/locations');

app.use(logger);
app.use(express.static('public'));

app.use('/blocks', blocks);
app.use('/locations', locations);

app.listen(3000, function() {
    console.log("listening on port 3000");
});
