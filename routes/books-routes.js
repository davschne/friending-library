var Book = require("../models/Book");
var User = require("../models/User");
var handle = require("../lib/handle");

module.exports = function(router) {

  router.post("/", function(req, res) {
    console.log("Received POST request at /api/books");
    var user = req.user;
    var book = req.body;
    var output;           // Book document to create and return
    book.owner = user._id;

    Book.create(book)
      .then(function(bookDoc) {
        output = bookDoc;
        return User.findByIdAndUpdate(user._id, {$push: {books: bookDoc._id}})
          .exec();
      }, function(err) {
        throw err;
      })
      .then(function(userDoc) {
        res.json(output);
      }, function(err) {
        handle[500](err, res);
      });
  });

  router.delete("/:bookid", function(req, res) {
    var userId = req.user._id;
    var bookId = req.params.bookid;
    // store record of deleted book to return
    var output;
    console.log("Received DELETE request at /api/books/" + bookId);
    Book.findByIdAndRemove(bookId)
      .exec()
      .then(function(bookDoc) {
        output = bookDoc;
        return User.findByIdAndUpdate(userId)
          .exec();
      }, function(err) {
        throw err;
      })
      .then(function() {
        res.json(output);
      }, function(err) {
        handle[500](err, res);
      });
  });

  router.get("/available", function(req, res) {
    console.log("Received GET request at /api/books/available");
    // find all books that aren't currently requested or borrowed and don't belong to the current user
    Book.find({request: "", borrower: "", owner: {$ne: req.user._id}})
      .populate("owner")
      .exec()
      .then(function(books) {
        res.json(books);
      }, function(err) {
        handle[500](err, res);
      });
  });
};
