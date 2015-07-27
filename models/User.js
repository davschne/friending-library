var mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");

var userSchema = new mongoose.Schema({
  _id: String,
  displayName: String,
  access_token: String,
  // name: {
  //   familyName: String,
  //   givenName: String
  //   },
  // email: String,
  books: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
  borrowing: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}]
});

userSchema.plugin(findOrCreate);

var User = mongoose.model("User", userSchema);

module.exports = User;
