var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    click: {type: Number, default: 0 }
  });
blogSchema.plugin(mongoosePaginate);
  module.exports = mongoose.model('Post', blogSchema);
