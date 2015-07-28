var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
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

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
