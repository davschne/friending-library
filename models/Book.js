var mongoose = require("mongoose");
// var User = require("./User");

var bookSchema = new mongoose.Schema({
  owner: {type: String, ref: "User"},
  requests: {type: String, ref: "User"}, // ONLY ALLOW ONE REQUEST
  borrower: {type: String, ref: "User"},
  dateBorrowed: Date,
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

// bookSchema.statics.add = function(book) {
//   return this.create(book)
//     .then(function(bookDoc) {
//       return bookDoc;
//     }, function(err) {
//       throw err;
//     });
// };

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
