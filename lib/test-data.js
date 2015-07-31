var mongoose = require("mongoose");

var user1 = {
  _id: "12345",
  displayName: "Philip",
  access_token: "v583ms",
  books: [],
  borrowing: [],
  requests: []
};
var user2 = {
  _id: "16829",
  displayName: "David",
  access_token: "cvasr32",
  books: [],
  borrowing: [],
  requests: []
};
var user3 = {
  _id: "02486",
  displayName: "Brandon",
  access_token: "kjlewq02",
  books: [],
  borrowing: [],
  requests: []
};
var user4 = {
  _id: "08473",
  displayName: "Colin",
  access_token: "uiowqe879803",
  books: [],
  borrowing: [],
  requests: []
};

var book1 = {
  _id: new mongoose.Types.ObjectId(),
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

var book2 = {
  title: 'Harry Potter 1 and the Philosopher\'s Stone',
  publisher: 'Bloomsbury Pub Limited',
  publishedDate: '1997',
  description: 'Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia and Uncle Vernon\'s house, which he thinks is normal for someone like him who\'s parents have been killed in a \'car crash\'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher\'s Stone! All this and muggles too. Now, what are they?',
  pageCount: 223,
  language: 'en',
  _id: new mongoose.Types.ObjectId(),
  imageLinks:
   { smallThumbnail: 'http://books.google.com/books/content?id=yZ1APgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
     thumbnail: 'http://books.google.com/books/content?id=yZ1APgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' },
  categories: [ 'Juvenile Fiction' ],
  ISBN: {
    10: "0747532699",
    13: "9780747532699"
  },
  authors: [ 'J. K. Rowling' ]
};

var book3 = {
  title: 'The Martian',
  subtitle: 'A Novel',
  publisher: 'Broadway Books',
  publishedDate: '2014-02-11',
  description: 'Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he\'s sure he\'ll be the first person to die there. After a dust storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he’s alive—and even if he could get word out, his supplies would be gone long before a rescue could arrive. Chances are, though, he won\'t have time to starve to death. The damaged machinery, unforgiving environment, or plain-old "human error" are much more likely to kill him first. But Mark isn\'t ready to give up yet. Drawing on his ingenuity, his engineering skills—and a relentless, dogged refusal to quit—he steadfastly confronts one seemingly insurmountable obstacle after the next. Will his resourcefulness be enough to overcome the impossible odds against him?',
  pageCount: 384,
  language: 'en',
  _id: new mongoose.Types.ObjectId(),
  imageLinks:
   { smallThumbnail: 'http://books.google.com/books/content?id=MQeHAAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
     thumbnail: 'http://books.google.com/books/content?id=MQeHAAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' },
  categories: [ 'Fiction' ],
  ISBN: {
    10: "0804139032",
    13: "9780804139038"
  },
  authors: [ 'Andy Weir' ]
};

var book4 = {
  title: 'The Martian Chronicles',
  publisher: 'Simon and Schuster',
  publishedDate: '2012-04-17',
  description: 'The tranquility of Mars is disrupted by humans who want to conquer space, colonize the planet, and escape a doomed Earth.',
  pageCount: 256,
  language: 'en',
  _id: new mongoose.Types.ObjectId(),
  imageLinks:
   { smallThumbnail: 'http://books.google.com/books/content?id=HzQXlPS48PQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
     thumbnail: 'http://books.google.com/books/content?id=HzQXlPS48PQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' },
  categories: [ 'Fiction' ],
  ISBN: {
    10: "1451678193",
    13: "9781451678192"
  },
  authors: [ 'Ray Bradbury' ]
};



module.exports = {
  users: [user1, user2, user3, user4],
  books: [book1, book2, book3, book4]
};
