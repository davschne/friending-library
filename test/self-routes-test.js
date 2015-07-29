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
    testUsers[0].books.push(testBooks[0]._id);
    testUsers[0].borrowing.push(testBooks[1]._id);
    testUsers[0].requests.push(testBooks[2]._id)
    User.create(testUsers[0], function(err, data) {
      if (!err) {
        testBooks[0].owner = testUsers[0]._id;
        Book.create(testBooks[0], function(err, data) {
          testBooks[1].owner = testUsers[1]._id;
          Book.create(testBooks[1], function(err, data) {
            testBooks[2].owner = testUsers[1]._id;
            Book.create(testBooks[2], function(err, data) {
              done();
            });
          });
        });
      }
    });
  });

  describe("GET", function() {
    it("should return an existent User as JSON, fully populated", function(done) {
      chai.request(url)
        .get("/api/self")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body._id).to.eql(testUsers[0]._id);
          expect(res.body.books.length).to.eql(1);
          expect(res.body.borrowing.length).to.eql(1);
          expect(res.body.requests.length).to.eql(1);
          done();
        });
    });
  });

  // describe("DELETE", function() {
  //   it("should delete a User and all of their Books from the database", function(done) {
  //     chai.request(url)
  //       .del("/api/self")
  //       .set("Authorization", "Bearer " + testUsers[0].access_token)
  //       .end(function(err, res) {
  //         expect(res).to.have.status(200);
  //         User.findOne({_id: testUsers[0]._id}, function(err, userDoc) {
  //           expect(userDoc).to.be.null;
  //           Book.find({owner: testUsers[0]._id}, function(err, bookDocs) {
  //             expect(bookDocs.length).to.eql(0);
  //             done();
  //           })
  //         });
  //       });
  //   });
  // });

  after(function(done) {
    User.findByIdAndRemove(testUsers[0]._id, function(err, data) {
      if (!err) done();
    });
  });
});
