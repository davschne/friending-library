var mongoose = require("mongoose");
var deepPopulate = require('mongoose-deep-populate');

var bookSchema = new mongoose.Schema({
  owner: {type: String, ref: "User", index: true},
  request: {type: String, ref: "User", default: ""}, // ONLY ALLOW ONE REQUEST
  borrower: {type: String, ref: "User", default: ""},
  dateBorrowed: Date,
  title: {type: String, required: true},
  subtitle: String,
  authors: [{type: String, required: true}],
  publisher: String,
  publishedDate: String,
  description: String,
  ISBN: {
    10: String,
    13: String
  },
  pageCount: Number,
  categories: [String],
  language: String,
  imageLinks: {
    smallThumbnail: String,
    thumbnail: String,
    small: String
  }
});

bookSchema.plugin(deepPopulate);

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
