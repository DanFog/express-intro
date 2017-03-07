var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
  type: String,
  description: String
});

export default mongoose.model('Location', LocationSchema);
