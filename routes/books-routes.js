var Book = require("../models/Book");
var User = require("../models/User");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.post(function(req, res) {
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

};
