var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");
var Book = require(__dirname + "/../models/Book");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.route("/")
    .get(function(req, res) {
      res.json(req.user);
    })
    .delete(function(req, res) {
      User.remove({_id: req.user._id}, function(err) {
        if (err) {
          handle[500](err, res);
        } else {
          Book.remove({owner: req.user._id}, function(err) {
            if (err) {
              handle[500](err, res);
            } else {
              res.sendStatus(200);
            }
          });
        }
      });
    })
}
