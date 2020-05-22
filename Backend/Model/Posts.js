var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var blogSchema = new Schema({
    title:  String,
    image:  [String],
    author: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'user'},
    body:   String,
    date: { type: Date, default: Date.now },
    favs:  Number
  });

  module.exports = mongoose.model('Post', blogSchema);
