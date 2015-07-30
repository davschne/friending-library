var chai = require("chai");
var expect = chai.expect;
var port = process.env.PORT || 3000;
var url = "localhost:" + port;
var app = require("../server");

chai.use(require("chai-http"));

var User = require("../models/User");
var Book = require("../models/Book");

var testData = require("../lib/test-data");
var testUsers = testData.users;

// describe("/login GET", function() {
//   it("should redirect to /auth/facebook", function(done) {
//     chai.request(url)
//       .get("/login")
//       .end(function(err, res) {
//         expect(err).to.be.null;
//         expect(res).to.redirectTo(url + "/auth/facebook");
//         done();
//       });
//   });
// });

describe("/logout POST", function() {

  before(function(done) {
    User.create(testUsers[0])
      .then(done(), function(err) { throw err; });
  });

  it("should set the access_token field in the user's document in the database to an empty string", function(done) {
    chai.request(url)
      .post("/logout")
      .set("Authorization", "Bearer " + testUsers[0].access_token)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        User.findById(testUsers[0]._id, function(err, userDoc) {
          if (err) throw err;
          expect(userDoc.access_token).to.equal("");
          done();
        });
      });
  });

  after(function(done) {
    User.findByIdAndRemove(testUsers[0]._id, function(err) {
      if (!err) done();
    });
  });
});
