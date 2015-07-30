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

describe("/api/trans", function() {

  for (var i = 0; i<4; i++) {
    testBooks[i].owner = testUsers[i]._id;
    testUsers[i].books = [testBooks[i]._id];
  }

  before(function(done) {

    User.create(testUsers[0])
      .then(function() {
        return User.create(testUsers[1])
      }, function(err) { throw err; })
      .then(function() {
        return User.create(testUsers[2])
      }, function(err) { throw err; })
      .then(function() {
        return User.create(testUsers[3])
      }, function(err) { throw err; })
      .then(function() {
        return User.ensureIndexes()
      }, function(err) { throw err; })
      .then(function() {
        return Book.create(testBooks[0])
      }, function(err) { throw err; })
      .then(function() {
        return Book.create(testBooks[1])
      }, function(err) { throw err; })
      .then(function() {
        return Book.create(testBooks[2])
      }, function(err) { throw err; })
      .then(function() {
        return Book.create(testBooks[3])
      }, function(err) { throw err; })
      .then(function() {
        done();
      }, function(err) { throw err; });
  });

  describe("/request", function() {

    describe("/POST", function() {

      before(function(done) {
        Book.findByIdAndUpdate(testBooks[1]._id, {request: testUsers[1]._id}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      before(function(done) {
        Book.findByIdAndUpdate(testBooks[2]._id, {borrower: testUsers[1]._id}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      it("should add Book's _id to User's requests array, set Book's request to User's _id, and return the Book as JSON", function(done) {
        chai.request(url)
          .post("/api/trans/request")
          .set("Authorization", "Bearer " + testUsers[0].access_token)
          .send({_id: testBooks[0]._id})
          .end(function(err, res) {
            expect(res.body.title).to.eql(testBooks[0].title);

            User.findOne({_id: testUsers[0]._id}, function(err, userDoc) {
              expect(userDoc.requests[0]).to.eql(testBooks[0]._id);
              Book.findById(testBooks[0]._id, function(err, bookDoc) {
                expect(bookDoc.request).to.eql(testUsers[0]._id);
                done();
              });
            });
          });
      });

      it("should, if Book currently requested, return 409 (conflict)", function(done) {
        chai.request(url)
          .post("/api/trans/request")
          .set("Authorization", "Bearer " + testUsers[0].access_token)
          .send({_id: testBooks[1]._id})
          .end(function(err, res) {
            expect(res).to.have.status(409);
            done();
          });
      });

      it("should, if Book currently borrowed, return 409 (conflict)", function(done) {
        chai.request(url)
          .post("/api/trans/request")
          .set("Authorization", "Bearer " + testUsers[0].access_token)
          .send({_id: testBooks[2]._id})
          .end(function(err, res) {
            expect(res).to.have.status(409);
            done();
          });
      });

      after(function(done) {
        Book.findByIdAndUpdate(testBooks[0]._id, {request: ""}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      after(function(done) {
        User.update({_id: testUsers[2]._id}, {requests: []}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      after(function(done) {
        Book.findByIdAndUpdate(testBooks[1]._id, {request: ""}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      after(function(done) {
        Book.findByIdAndUpdate(testBooks[2]._id, {borrower: ""}, function(err, bookDoc) {
          if (!err) done();
        });
      });

    });

    describe("/DELETE", function() {

      before(function(done) {
        User.update({_id: testUsers[2]._id}, {$pushAll: {requests : [testBooks[1]._id, testBooks[3]._id, testBooks[2]._id]}}, function(err) {
          if (!err) done();
        });
      });

      before(function(done) {
        Book.findByIdAndUpdate(testBooks[3]._id, {request: testUsers[2]._id}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      it("should remove Book's _id from User's requests, set Book's request to '', and return the book as JSON", function(done) {
        chai.request(url)
          .del("/api/trans/request/" + testBooks[3]._id)
          .set("Authorization", "Bearer " + testUsers[2].access_token)
          .end(function(err, res) {
            expect(res.body.title).to.eql(testBooks[3].title);

            Book.findById(testBooks[3]._id, function(err, bookDoc) {
              expect(bookDoc.request).to.eql("");
              User.findOne({_id: testUsers[2]._id}, function(err, userDoc) {
                expect(userDoc.requests.length).to.eql(2);
                // Check to make sure that the correct book was removed from the requests array
                expect(userDoc.requests[0]).to.eql(testBooks[1]._id);
                expect(userDoc.requests[1]).to.eql(testBooks[2]._id);
                done();
              });
            });
          });
      });

      after(function(done) {
        User.update({_id: testUsers[2]._id}, {requests : []}, function(err) {
          if (!err) done();
        });
      });

    });
  });

  describe("/deny POST", function() {

    before(function(done) {
      User.update({_id: testUsers[1]._id}, {$pushAll: {requests : [testBooks[1]._id, testBooks[2]._id, testBooks[3]._id]}}, function(err) {
        if (!err) done();
      });
    });

    before(function(done) {
      Book.findByIdAndUpdate(testBooks[2]._id, {request: testUsers[1]._id, owner: testUsers[0]._id}, function(err, bookDoc) {
        if (!err) done();
      });
    });

    it("should remove Book's _id from other User's requests, set Book's request to '', and return the Book as JSON", function(done) {
      chai.request(url)
        .post("/api/trans/deny")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .send({_id: testBooks[2]._id})
        .end(function(err, res) {
          expect(res.body.title).to.eql(testBooks[2].title);
          Book.findById(testBooks[2]._id, function(err, bookDoc) {
            expect(bookDoc.request).to.eql("");
            User.findOne({_id: testUsers[1]._id}, function(err, userDoc) {
              expect(userDoc.requests.length).to.eql(2);
              // Check correct book was removed from the requests
              expect(userDoc.requests[0]).to.eql(testBooks[1]._id);
              expect(userDoc.requests[1]).to.eql(testBooks[3]._id);
              done();
            })
          })
        });
    });

    after(function(done) {
      User.update({_id: testUsers[1]._id}, {requests : []}, function(err) {
        if (!err) done();
      });
    });

    after(function(done) {
      Book.findByIdAndUpdate(testBooks[2]._id, {request: "", owner: testUsers[2]._id}, function(err, bookDoc) {
        if (!err) done();
      });
    });

  });

  describe("/approve POST", function() {

    before(function(done) {
      User.update({_id: testUsers[1]._id}, {$push: {requests : testBooks[0]._id}}, function(err) {
        if (!err) done();
      });
    });

    before(function(done) {
      Book.findByIdAndUpdate(testBooks[0]._id, {request: testUsers[1]._id}, function(err, bookDoc) {
        if (!err) done();
      });
    });

    it("should move Book's _id from other User's requests to other User's borrowing, set Book's request to '' and borrower to other User's _id, and return the Book as JSON", function(done) {
      chai.request(url)
        .post("/api/trans/approve")
        .set("Authorization", "Bearer " + testUsers[0].access_token)
        .send({_id: testBooks[0]._id})
        .end(function(err, res) {
          expect(res.body.title).to.eql(testBooks[0].title);

          User.findOne({_id: testUsers[1]._id}, function(err, userDoc) {
            expect(userDoc.requests.length).to.eql(0);
            expect(userDoc.borrowing.length).to.eql(1);
            expect(userDoc.borrowing[0]).to.eql(testBooks[0]._id);

            Book.findById(testBooks[0]._id, function(err, bookDoc) {
              expect(bookDoc.request).to.eql("");
              expect(bookDoc.borrower).to.eql(testUsers[1]._id);
              done();
            });
          });
        });
    });


    after(function(done) {
      User.update({_id: testUsers[1]._id}, {borrowing : []}, function(err) {
        if (!err) done();
      });
    });

    after(function(done) {
      Book.findByIdAndUpdate(testBooks[0]._id, {borrower: ""}, function(err, bookDoc) {
        if (!err) done();
      });
    });


  });

  describe("/returned POST", function() {

    before(function(done) {
        User.update({_id: testUsers[3]._id}, {$pushAll: {borrowing : [testBooks[1]._id, testBooks[3]._id, testBooks[2]._id]}}, function(err) {
          if (!err) done();
        });
      });

      before(function(done) {
        Book.findByIdAndUpdate(testBooks[3]._id, {borrower: testUsers[3]._id, owner: testUsers[0]._id}, function(err, bookDoc) {
          if (!err) done();
        });
      });

      it("should remove Book's _id from User's borrowing, set Book's borrower to '', and return the book as JSON", function(done) {
        chai.request(url)
          .post("/api/trans/returned")
          .set("Authorization", "Bearer " + testUsers[0].access_token)
          .send({_id: testBooks[3]._id})
          .end(function(err, res) {
            expect(res.body.title).to.eql(testBooks[3].title);

            Book.findById(testBooks[3]._id, function(err, bookDoc) {
              expect(bookDoc.borrower).to.eql("");
              User.findOne({_id: testUsers[3]._id}, function(err, userDoc) {
                expect(userDoc.borrowing.length).to.eql(2);
                // Check to make sure that the correct book was removed from the borrowing array
                expect(userDoc.borrowing[0]).to.eql(testBooks[1]._id);
                expect(userDoc.borrowing[1]).to.eql(testBooks[2]._id);
                done();
              });
            });
          });
      });

      after(function(done) {
        User.update({_id: testUsers[3]._id}, {borrowing : [], owner: testUsers[3]._id}, function(err) {
          if (!err) done();
        });
      });

  });

  after(function(done) {

    User.remove(testUsers[0]._id)
      .then(function() {
        return User.remove({_id: testUsers[1]._id});
      }, function(err) { throw err; })
      .then(function() {
        return User.remove({_id: testUsers[2]._id});
      }, function(err) { throw err; })
      .then(function() {
        return User.remove({_id: testUsers[3]._id});
      }, function(err) { throw err; })
      .then(function() {
        return Book.remove({_id: testBooks[0]._id});
      }, function(err) { throw err; })
      .then(function() {
        return Book.remove({_id: testBooks[1]._id});
      }, function(err) { throw err; })
      .then(function() {
        return Book.remove({_id: testBooks[2]._id});
      }, function(err) { throw err; })
      .then(function() {
        return Book.remove({_id: testBooks[3]._id});
      }, function(err) { throw err; })
      .then(function() {
        done();
      }, function(err) { throw err; });

  });

});
