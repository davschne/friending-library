var BearerStrategy = require("passport-http-bearer").Strategy;
var passport = require("passport");
var User = require("../models/User");

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({access_token: token},
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        else {
          return done(null, user, {scope: "all"})
        }
      })
    }
  ));

module.exports = passport.authenticate("bearer", {session: false});
