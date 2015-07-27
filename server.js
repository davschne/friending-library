var express = require("express");
var app = express();

var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var BearerStrategy = require("passport-http-bearer").Strategy;

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
  ))

app.get("/auth/facebook",
  passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", {failureRedirect: "/login"}),
  function(req, res) {
    res.json(req.user);
  });

app.get("/api/test",
  passport.authenticate("bearer", {session: false}),
  function(req, res) {
    res.send("Logged in as " + req.user.displayName);
  });

app.listen(3000);
