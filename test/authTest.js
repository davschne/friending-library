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

describe("API", function() {

  before(function(done) {
    User.create(dummyUser, function(err, data) {
      if (!err) done();
    })
  });

  it("should grant access to endpoint /api/test if access token is included in header field Authorization", function(done) {
    chai.request(url)
      .get("/api/test")
      .set("Authorization", "Bearer " + dummyUser.access_token)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      })
  });

  after(function(done) {
    User.findByIdAndRemove(dummyUser._id, function(err, data) {
      if (!err) done();
    });
  });
})
