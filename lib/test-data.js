var mongoose = require("mongoose");

var dummyUser = {
  _id: "Dummy",
  displayName: "Idiot",
  access_token: "jerkface",
  books: [],
  borrowing: []
};

var dummyBook = {
  _id: new mongoose.Types.ObjectId,
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

exports.user = dummyUser;
exports.book = dummyBook;
