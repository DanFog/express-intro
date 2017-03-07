var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseURLencoded = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
var blockModel = require('./blocks.model.js');

var db = mongoose.connection;

router.route('/')
  .get(function(request, response){
    if(request.query.limit >= 0) {
        blockModel.find(function(err, blocks) {
          console.log(blocks);
        });
    } else {
      blockModel.find(function(err, blocks) {
        console.log(blocks);
      });
    }
  })
  .post(parseURLencoded, function(request, response){
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name);
  });

router.route('/:name')
  .all(function(request, response, next) {
    var name = request.params.name;
    console.log(name);
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    request.blockName = block;
    next();
  })
  .get(function(request, response) {
    var description = blocks[request.blockName];
    if(!description) {
        response.status(404);
        response.json("Block not found");
    } else {
        response.json(description);
    }
  })
  .delete(function(request, response) {
    delete blocks[request.blockName];
    response.sendStatus(200);
  });

module.exports = router;
