var mongoose = require('mongoose');

var BlockSchema = new mongoose.Schema({
  type: String,
  description: String
});

export default mongoose.model('Block', BlockSchema);
