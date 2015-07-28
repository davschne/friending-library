var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");

var User = require("./models/User");
var Book = require("./models/Book");

var testData = require("./lib/test-data");
var testBooks = testData.books;
var testUsers = testData.users;

module.exports.dbSetup = function() {
  for (var i = 0; i<4; i++) {
    testBooks[i].owner = testUsers[i]._id;
    testUsers[i].books = [testBooks[i]._id];
  }

  User.create(testUsers[0])
    .then(User.create(testUsers[1]))
    .then(User.create(testUsers[2]))
    .then(User.create(testUsers[3]))
    .then(
      User.ensureIndexes(function(err) {
        Book.create(testBooks[0])
        .then(Book.create(testBooks[1]))
        .then(Book.create(testBooks[2]))
        .then(Book.create(testBooks[3]))
        .then(function() {
          console.log("db populated");
          mongoose.connection.close();
        });
      })
    );
};



module.exports.dbBreakdown = function() {
  mongoose.connection.once("open", function() {
    mongoose.connection.db.dropDatabase(function() {
      console.log("db dropped");
      mongoose.connection.close();
    });
  });
};
