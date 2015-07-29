var chai = require("chai");
var expect = chai.expect;
var port = process.env.PORT || 3000;
var url = "localhost:" + port;
var app = require("../server");

chai.use(require("chai-http"));

var User = require("../models/User");
var Book = require("../models/Book")

var testData = require("../lib/test-data");
var testBooks = testData.books;
var testUsers = testData.users;

describe("/api/self", function() {
  before(function(done) {
    User.create(testUsers[0], function(err, data) {
      if (!err) {
        testBooks[0].owner = testUsers[0]._id;
        Book.create(testBooks[0], function(err, data) {
          testBooks[1].owner = testUsers[0]._id;
          Book.create(testBooks[1], function(err, data) {
            done();
          });
        });
      }
    });
  });

  describe("GET", function() {
    it("should return an existent User as JSON", function(done) {
      chai.request(url)
        .get("/api/self")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body._id).to.eql(testUsers[0]._id);
          done();
        });
    });
  });

  describe("DELETE", function() {
    it("should delete a User and all of their Books from the database", function(done) {
      chai.request(url)
        .del("/api/self")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          User.findOne({_id: testUsers[0]._id}, function(err, userDoc) {
            expect(userDoc).to.be.null;
            Book.find({owner: testUsers[0]._id}, function(err, bookDocs) {
              expect(bookDocs.length).to.eql(0);
              done();
            })
          });
        });
    });
  });

  after(function(done) {
    User.findByIdAndRemove(testUsers[0]._id, function(err, data) {
      if (!err) done();
    });
  });
});

describe("/api/self/books", function() {

  before(function(done) {
    User.create(testUsers[0])
      .then(function() {
        return User.create(testUsers[1]);
      }, function(err) { throw err; })
      .then(function() {
        testBooks[0].owner = testUsers[0]._id;
        testBooks[0].borrower = testUsers[1]._id;
        testBooks[0].request = testUsers[1]._id;
        return Book.create(testBooks[0]);
      }, function(err) { throw err; })
      .then(function() {
        done();
      }, function(err) { throw err; });
    });

  describe("GET", function() {
    it("should return an array of the user's books as JSON with 'request' and 'borrower' fields populated", function(done) {
      chai.request(url)
        .get("/api/self/books")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("array");
          expect(res.body[0].borrower.displayName).to.equal(testUsers[1].displayName);
          expect(res.body[0].request.displayName).to.equal(testUsers[1].displayName);
          done();
        });
      });
    });

  after(function(done) {
    User.findByIdAndRemove(testUsers[0]._id)
      .exec()
      .then(function() {
        return User.findByIdAndRemove(testUsers[1]._id)
      }, function(err) { throw err; })
      .then(function() {
        return Book.remove({creator: testUsers[0]._id})
      }, function(err) { throw err; })
      .then(function() {
        done();
      }, function(err) { throw err; });
  });
});
