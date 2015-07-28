var chai = require("chai");
var expect = chai.expect;
var port = process.env.PORT || 3000;
var url = "localhost:" + port;
var app = require("../server");

chai.use(require("chai-http"));

var User = require("../models/User");

var dummyUser = {
  _id: "Dummy",
  displayName: "Idiot",
  access_token: "jerkface"
}

describe("/api/users", function() {
  before(function(done) {
    User.create(dummyUser, function(err, data) {
      if (!err) done();
    })
  });

  describe("GET", function() {
    it("should return an existent User as JSON", function(done) {
      chai.request(url)
        .get("/api/users")
        .set("Authorization", "Bearer " + dummyUser.access_token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body._id).to.eql(dummyUser._id);
          done();
        });
    });
  });

  after(function(done) {
    User.findByIdAndRemove(dummyUser._id, function(err, data) {
      if (!err) done();
    });
  });
});
