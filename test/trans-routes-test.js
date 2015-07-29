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
        User.create(testUsers[1])
      }, function(err) { throw err; })
      .then(function() {
        User.create(testUsers[2])
      }, function(err) { throw err; })
      .then(function() {
        User.create(testUsers[3])
      }, function(err) { throw err; })
      .then(function() {
        User.ensureIndexes()
      }, function(err) { throw err; })
      .then(function() {
        Book.create(testBooks[0])
      }, function(err) { throw err; })
      .then(function() {
        Book.create(testBooks[1])
      }, function(err) { throw err; })
      .then(function() {
        Book.create(testBooks[2])
      }, function(err) { throw err; })
      .then(function() {
        Book.create(testBooks[3])
      }, function(err) { throw err; })
      .then(function() {
        done();
      }, function(err) { throw err; });
  });

  describe("/request", function() {
    describe("/POST", function() {



    });

    describe("/DELETE", function() {



    });
  });

  describe("/deny POST", function() {



  });

  describe("/approve POST", function() {



  });

  describe("/returned POST", function() {



  });

  after(function(done) {

    User.remove(testUsers[0]._id)
      .then(function() {
        User.remove(testUsers[1]._id)
      }, function(err) { throw err; })
      .then(function() {
        User.remove(testUsers[2]._id)
      }, function(err) { throw err; })
      .then(function() {
        User.remove(testUsers[3]._id)
      }, function(err) { throw err; })
      .then(function() {
        Book.remove(testBooks[0]._id)
      }, function(err) { throw err; })
      .then(function() {
        Book.remove(testBooks[1]._id)
      }, function(err) { throw err; })
      .then(function() {
        Book.remove(testBooks[2]._id)
      }, function(err) { throw err; })
      .then(function() {
        Book.remove(testBooks[3]._id)
      }, function(err) { throw err; })
      .then(function() {
        done();
      }, function(err) { throw err; });

  });

});
