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

  describe("GET", function() {
    it("should return an array of the user's books as JSON", function(done) {
      chai.request(url)
        .get("/api/books")
        .set("Authorization", "Bearer " + user.access_token)
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

});
