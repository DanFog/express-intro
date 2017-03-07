var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseURLencoded = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
var blockModel = require('./blocks.model.js');

router.route('/')
  .get(function(request, response){
    if(request.query.limit >= 0) {
        var query = blockModel.find();
        query.select('block');
        query.exec(function(err, blocks) {
          console.log(blocks);
        })
    } else {
      var query = blockModel.find();
      query.select('block');
      query.exec(function(err, blocks) {
        var blockNameArray =[];
        for(var i = 0; i < blocks.length; i++) {
          blockNameArray.push(blocks[i]['block']);
          console.log(blocks[i]);
        }
        response.json(blockNameArray);
      })
    }
  })
  .post(parseURLencoded, function(request, response){
    console.log(request.body);
    var newBlock = new blockModel({
      block: request.body.name,
      description: request.body.description
    });

    newBlock.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        response.status(200).json(newBlock.block);
      }
    })
    // var newBlock = request.body;
    // blocks[newBlock.name] = newBlock.description;
    //
    // response.status(201).json(newBlock.name);
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
    var query = blockModel.findOne({ 'block': request.blockName });
    query.exec(function(err, block) {
      var newBlock = {};
      newBlock.block = block.block;
      newBlock.description = block.description;
      response.json(newBlock);
    })
  })
  .delete(function(request, response) {
    delete blocks[request.blockName];
    response.sendStatus(200);
  });

module.exports = router;
