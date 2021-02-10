var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HomePageSchema = new Schema({
  blog: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('HomePage', HomePageSchema);
