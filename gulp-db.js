var mongoose = require("mongoose");

module.exports.dbSetup = function() {
  var user1 = {
    _id: "12345",
    displayName: "Philip",
    access_token: "v583ms",
    books: [],
    borrowing: []
  };
  var user2 = {
    _id: "16829",
    displayName: "David",
    access_token: "cvasr32",
    books: [],
    borrowing: []
  };
  var user3 = {
    _id: "02486",
    displayName: "Brandon",
    access_token: "kjlewq02",
    books: [],
    borrowing: []
  };
  var user4 = {
    _id: "08473",
    displayName: "Colin",
    access_token: "uiowqe879803",
    books: [],
    borrowing: []
  };

  var book1 = {
    owner: "12345",
    title: "Fifty Shades of Grey",
    subtitle: "",
    authors: [
     "E. L. James"
    ],
    "publisher": "Zas4ita",
    "publishedDate": "2015-03-25",
    "description": "MORE THAN 100 MILLION COPIES SOLD WORLD WIDE. When literature student Anastasia Steele interviews successful entrepreneur Christian Grey, she finds him very attractive and deeply intimidating. Convinced that their meeting went badly, she tries to put him out of her mind – until he turns up at the store where she works part-time, and invites her out. Unworldly and innocent, Ana is shocked to find she wants this man. And, when he warns her to keep her distance, it only makes her want him more. As they embark on a passionate love affair, Ana discovers more about her own desires, as well as the dark secrets Christian keeps hidden away from public view ... Motion Picture Artwork © 2014 Universal Studios. All Rights Reserved.",
    ISBN: {
      10: "1612130283",
      13: "9781612130286"
    },
    pageCount: 380,
    categories: [
     "Fiction"
    ],
    language: "en",
    imageLinks: {
      smallThumbnail: "http://books.google.com/books/content?id=VXSVBwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      thumbnail: "http://books.google.com/books/content?id=VXSVBwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    }
  };

  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");

  var User = require("./models/User");
  var Book = require("./models/Book");

  Book.create(book1, function(err, book1) {
    user1["books"].push(book1["_id"]);
    User.create(user1, function(err,user1) {
      User.create(user2, function(err,user2) {
        User.create(user3, function(err,user3) {
          User.create(user4, function(err,user4) {
            console.log("users added");
            mongoose.connection.close();
          });
        });
      });
    });
  });


};

module.exports.dbBreakdown = function() {
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");
  mongoose.connection.once("open", function() {
    mongoose.connection.db.dropDatabase(function() {
      console.log("db dropped");
      mongoose.connection.close();
    });
  });
};
