var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var blogSchema = new Schema({
    title:  String,
    image:  [String],
    author: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'user'},
    body:   String,
    date: { type: Date, default: Date.now },
    favs:  Number,
    like: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    tag: String,
    isVerified: { type: Boolean, default: false, required: true },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
  });

  module.exports = mongoose.model('Post', blogSchema);
