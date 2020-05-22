var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  body: {type: String},
  author: {type: Schema.Types.ObjectId, ref: 'user'},
  date: {type: Date, default: Date.now},
  blog: {type: String}
})

module.exports = mongoose.model('Comment', commentSchema);
