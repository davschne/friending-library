var User = require("../models/User");
var handle = require("../lib/handle");
var authenticate = require("../middleware/auth-bearer");

module.exports = function(router) {

  router.get("/login", function(req, res) {
    res.redirect(302, "/auth/facebook");
  });

  router.post("/logout", authenticate, function(req, res) {
    User.findByIdAndUpdate(req.user._id,
      {$set: {access_token: ""}},
      function(err) {
        if (err) handle[500](err, res);
        else res.json({msg: "Log-out successful"});
    });
  });
};
