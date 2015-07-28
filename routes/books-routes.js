var Book = require("../models/Book");
var User = require("../models/User");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.post(function(req, res) {
    var user = req.user;
    var book = req.body;
    Book.add(book, user)
      .then(function(bookDoc) {
        res.json(bookDoc);
      }, function(err) {
        handle[500](err, res);
      });

    // Book.create(book)
    //   .then(function(foundBook) {
    //     // Add book to user's "books" array
    //     User.
    //   }, function(err) {
    //     handle[500](err, res);
    //   })


    // Return Book
  })
}
