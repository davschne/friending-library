var express = require("express");
var app = express();

var passport = require("passport");

var FacebookStrategy = require("passport-facebook").Strategy;

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");

var User = require("./models/User");

var db = mongoose.connection;

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      _id: profile.id
    }, {
      displayName: profile.displayName
    }, function(err, user) {
      return done(err, user);
    });
  })
);

app.get("/auth/facebook",
  passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", {failureRedirect: "/login"}),
  function(req, res) {
    res.json("ooookay");
  });


app.listen(3000);
