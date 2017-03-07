var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseURLencoded = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(function(request, response){
    if(request.query.limit >= 0) {
        response.json(Object.keys(locations.slice(0, request.query.limit)));
    } else {
        response.json(Object.keys(locations));
    }
  });

router.route('/:name')
  .get(function(request, response) {
      var location = locations[request.blockName];
      if(!location) {
          response.status(404);
          response.json("Block not found");
      } else {
          response.json(location);
      }
  });

module.exports = router;
