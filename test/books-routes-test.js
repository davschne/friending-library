/* jshint expr: true */

var chai = require("chai");
var expect = chai.expect;
var port = process.env.PORT || 3000;
var url = "localhost:" + port;
var app = require("../server");

chai.use(require("chai-http"));

var User = require("../models/User");
var Book = require("../models/Book");

var testData = require("../lib/test-data");
var testUsers = testData.users;
var testBooks = testData.books;

describe("/api/books", function() {

  beforeEach(function(done) {
    User.create(testUsers[0], function(err, data) {
      if (!err) done();
    });
  });

  afterEach(function(done) {
    User.findByIdAndRemove(testUsers[0]._id, function(err, data) {
      if (!err) done();
    });
  });

  describe("POST", function() {
    it("should add a new Book document to the database, add a reference to this document's id in the corresponding User document, and return the added Book document as JSON", function(done) {
      chai.request(url)
        .post("/api/books")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .type("json")
        .send(testBooks[0])
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.title).to.equal(testBooks[0].title);
          expect(res.body.owner).to.equal(testUsers[0]._id);
          done();
        });
    });
    after(function(done) {
      Book.findByIdAndRemove(testBooks[0]._id, function(err, data) {
        if (!err) done();
      });
    });
  });
});

describe("/api/books/:book", function() {

  describe("DELETE", function() {

    var createdBookId;

    before(function(done) {
      User.create(testUsers[0], function(err, data) {
        if (!err) done();
      });
    });

    before(function(done) {
      Book.create(testBooks[0]) /*, function(err, bookDoc) { */
        .then(function(bookDoc) {

          // createdBookId = bookDoc;
          createdBookId = bookDoc._id;
          testBooks[0]._id = bookDoc._id;
          return User.findByIdAndUpdate(testUsers[0]._id,
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
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.title).to.equal(testBooks[0].title);
          done();
        });
    });

    after(function(done) {
      User.findByIdAndRemove(testUsers[0]._id, function(err, data) {
        if (!err) done();
      });
    });

  });
});

describe("/api/books/available", function() {

  describe("GET", function() {

    before(function(done) {
      User.create(testUsers[0])
        .then(function() {
          // testUsers[1] will be owner of testBooks[3]
          var user = testUsers[1];
          user.books.push(testBooks[3]._id);
          return User.create(user);
        }, function(err) { throw err; })
        .then(function() {
          testBooks[0].owner = testUsers[0]._id;
          return Book.create(testBooks[0]);
        }, function(err) { throw err; })
        .then(function() {
          testBooks[1].borrower = "your mom";
          return Book.create(testBooks[1]);
        }, function(err) { throw err; })
        .then(function() {
          testBooks[2].request = "Yeah, I want that.";
          return Book.create(testBooks[2]);
        }, function(err) { throw err; })
        .then(function() {
          // This is the book that should be returned in the test.
          // Its owner is testUsers[1].
          testBooks[3].owner = testUsers[1]._id;
          return Book.create(testBooks[3]);
        }, function(err) { throw err; })
        .then(function() {
          done();
        }, function(err) { throw err; });
      });

    it("should return a JSON array of books that don't belong to the current user, have no outstanding requests, and aren't currently borrowed. .owner property should be populated", function(done) {
      chai.request(url)
        .get("/api/books/available")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property("length", 1);
          expect(res.body[0].title).to.equal(testBooks[3].title);
          expect(res.body[0].owner.displayName).to.equal("David");
          done();
        });
    });

    after(function(done) {
      User.remove({$or:
        [{_id: testUsers[0]._id},
         {_id: testUsers[1]._id}]
        })
        .exec()
        .then(function() {
          return Book.remove({$or:
            [{title: testBooks[0].title},
             {title: testBooks[1].title},
             {title: testBooks[2].title},
             {title: testBooks[3].title}]
          });
        }, function(err) { throw err; })
        .then(function() {
          done();
        }, function(err) { throw err; });
    });
  });
});
