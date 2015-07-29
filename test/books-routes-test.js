var chai = require("chai");
var expect = chai.expect;
var port = process.env.PORT || 3000;
var url = "localhost:" + port;
var app = require("../server");

chai.use(require("chai-http"));

var User = require("../models/User");
var Book = require("../models/Book");

var testData = require("../lib/test-data");
var user = testData.users[0];
var book = testData.books[0];

describe("/api/books", function() {

  beforeEach(function(done) {
    User.create(user, function(err, data) {
      if (!err) done();
    });
  });

  afterEach(function(done) {
    User.findByIdAndRemove(user._id, function(err, data) {
      if (!err) done();
    });
  });

  describe("POST", function() {
    it("should add a new Book document to the database, add a reference to this document's id in the corresponding User document, and return the added Book document as JSON", function(done) {
      chai.request(url)
        .post("/api/books")
        .set("Authorization", "Bearer " + user.access_token)
        .type("json")
        .send(book)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.title).to.equal(book.title);
          expect(res.body.owner).to.equal(user._id);
          done();
        });
    });
    after(function(done) {
      Book.findByIdAndRemove(book._id, function(err, data) {
        if (!err) done();
      });
    });
  });
});

describe("/api/books/:book", function() {

  describe("DELETE", function() {

    var createdBookId;

    before(function(done) {
      User.create(user, function(err, data) {
        if (!err) done();
      });
    });

    before(function(done) {
      Book.create(book) /*, function(err, bookDoc) { */
        .then(function(bookDoc) {

          // createdBookId = bookDoc;
          createdBookId = bookDoc._id;
          book._id = bookDoc._id;
          return User.findByIdAndUpdate(user._id,
            {$push: {books: bookDoc._id}}
          ).exec();
        }, function(err) {
          throw err;
        })
        .then(function(userDoc) {
          done();
        }, function(err) {
          throw err;
        });
    });

    it("should delete a Book document from the database, remove the corresponding reference in the user's books array, and return the deleted Book document as JSON", function(done) {
      chai.request(url)
        .del("/api/books/" + createdBookId)
        .set("Authorization", "Bearer " + user.access_token)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.title).to.equal(book.title);
          done();
        });
    });

    after(function(done) {
      User.findByIdAndRemove(user._id, function(err, data) {
        if (!err) done();
      });
    });

  });

});
