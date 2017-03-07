var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  type: String,
  description: String
});

module.exports = mongoose.model('Location', LocationSchema);
