var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");
var Book = require(__dirname + "/../models/Book");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.route("/")
    .get(function(req, res) {
      User.findById(req.user._id)
        .populate("books")
        .populate("borrowing")
        .populate("requests")
        .exec(function(err, user) {
          if (err) {
            handle[500](err, res);
          } else {
            res.json(user);
          }
        });
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
              res.json(req.user);
            }
          });
        }
      });
    });

  router.route("/books")
    .get(function(req, res) {
      console.log("Received GET request at /api/self/books");
      var user = req.user;
      Book.find({owner: user._id})
        .populate("request")
        .populate("borrower")
        .exec()
        .then(function(books) {
          res.json(books);
        }, function(err) {
          handle[500](err, res);
        });
  });
}
