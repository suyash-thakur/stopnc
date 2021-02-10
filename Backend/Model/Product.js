var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  name: { type: String, required: true},
  link: { type: String, required: true },
  image: {type: String, required: true}
});
module.exports = mongoose.model('Product', productSchema);
