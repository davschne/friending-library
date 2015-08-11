var mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");
var deepPopulate = require('mongoose-deep-populate');

var userSchema = new mongoose.Schema({
  _id: String,
  displayName: String,
  access_token: String,
  books: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
  borrowing: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
  requests: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}]
});

userSchema.plugin(findOrCreate);
userSchema.plugin(deepPopulate);

var User = mongoose.model("User", userSchema);

module.exports = User;
