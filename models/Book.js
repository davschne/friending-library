var mongoose = require("mongoose");
var User = require("./User");

var bookSchema = new mongoose.Schema({
  _owner: {type: String, ref: "User"},
  title: String,
  subtitle: String,
  authors: [String],
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

bookSchema.statics.add = function(book, user) {
  book._owner = user._id;
  return this.create(book)
    .then(function(bookDoc) {
      // Add to user's "books" array
      return User.addBook(bookDoc, user);
    }, function(err) {
      throw err;
    });
};

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
