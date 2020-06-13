const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  discription: { type: String},
  about: { type: String },
  follower: [{type: Schema.Types.ObjectId, ref: "User"}],
  following: [{type: Schema.Types.ObjectId, ref: "User"}],
  bookmarked: [{type: Schema.Types.ObjectId, ref: "Post"}]

});

const User = mongoose.model('user', userSchema);


module.exports = User;

module.exports = mongoose.model("User", userSchema);
