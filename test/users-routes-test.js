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

describe("/api/users", function() {
  before(function(done) {
    User.create(testUsers[0], function(err, data) {
      if (!err) done();
    });
  });
  before(function(done) {
    User.create(testUsers[1], function(err, data) {
      if (!err) {
        testBooks[0].owner = testUsers[1]._id;
        Book.create(testBooks[0], function(err, data) {
          testBooks[1].owner = testUsers[1]._id;
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
        .get("/api/users")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body._id).to.eql(testUsers[0]._id);
          done();
        });
    });
  });

  after(function(done) {
    User.findByIdAndRemove(testUsers[0]._id, function(err, data) {
      if (!err) done();
    });
  });
  after(function(done) {
    User.findByIdAndRemove(testUsers[1]._id, function(err, data) {
      if (!err) done();
    });
  });
  after(function(done) {
    Book.remove({owner: testUsers[1]._id}, function(err, data) {
      if (!err) done();
    });
  });
});
