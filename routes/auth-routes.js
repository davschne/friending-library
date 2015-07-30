var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;
var User = require("../models/User");

passport.use(new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  enableProof: false
  },
  function(access_token, refreshToken, profile, done) {
    User.findOrCreate({
      _id: profile.id
    }, {
      displayName: profile.displayName
    }, function(err, user) {
      if (user) {
        user.access_token = access_token;
        user.save(function(err, savedUser) {
          done(err, savedUser);
        });
      } else {
        done(err, user);
      }
    });
  })
);

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_ID,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(access_token, tokenSecret, profile, done) {
    User.findOrCreate({
      _id: profile.id
    }, {
      displayName: profile.displayName
    }, function(err, user) {
      if (user) {
        user.access_token = access_token;
        user.save(function(err, savedUser) {
          done(err, savedUser);
        });
      } else {
        done(err, user);
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = function(router) {

  router.get("/facebook", passport.authenticate("facebook"));

  router.get("/facebook/callback",
    passport.authenticate("facebook", {failureRedirect: "/"}),
    function(req, res) {
      res.redirect("/#/success?access_token=" + req.user.access_token);
    });

  router.get("/twitter", passport.authenticate("twitter"));

  router.get("/twitter/callback",
    passport.authenticate("twitter", {failureRedirect: "/"}),
    function(req, res) {
      res.redirect("/#/success?access_token=" + req.user.access_token);
    });
};
