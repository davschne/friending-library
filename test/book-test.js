// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/friending-library-test");
// var chai = require("chai");
// var User = require("../models/User");
// var Book = require("../models/Book");
// var testData = require("../lib/test-data");
// var dummyUser = testData.user;
// var dummyBook = testData.book;

// describe("Book", function() {
//   before(function(done) {
//     // insert a User document
//     User.create(dummyUser, function(err, user) {
//       if (err) throw err;
//       done();
//     });
//   });
//   describe(".add", function() {
//     it("should add a Book document and add a reference to this document in the user's 'books' array", function(done) {

//       done();
//     });
//   });
//   after(function(done) {
//     // remove User document
//     User.findByIdAndRemove(dummyUser._id, function(err, user) {
//       if (err) throw err;
//       // remove Book document
//       Book.findByIdAndRemove(dummyBook._id, function(err, user) {
//         if (err) throw err;
//         done();
//       });
//     });
//   });
// });

// process.on("exit", function() {
//   mongoose.connection.db.dropDatabase();
//   mongoose.disconnect();
// });
