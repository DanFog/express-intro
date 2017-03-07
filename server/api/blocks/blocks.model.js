'use strict';

var mongoose = require('mongoose');

var BlockSchema = new mongoose.Schema({
  block: String,
  description: String
});

module.exports = mongoose.model('Block', BlockSchema);
