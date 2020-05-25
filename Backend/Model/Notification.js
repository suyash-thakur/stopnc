var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var notificationSchema = new Schema ({
  message: {type: String, required: true},
  recipient: {type: Schema.Types.ObjectId, ref: 'User'},
  refId: {type: Schema.Types.ObjectId, refPath: 'type'},
  type: {type: String, required: true, enum: ['User', 'Post']}
});

module.exports = mongoose.model('', blogSchema);

