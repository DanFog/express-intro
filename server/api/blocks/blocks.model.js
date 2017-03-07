'use strict';

var mongoose = require('mongoose');

var BlockSchema = new mongoose.Schema({
  type: String,
  description: String
});

module.exports = mongoose.model('Block', BlockSchema);
