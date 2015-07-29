var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");
var Book = require(__dirname + "/../models/Book");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.route("/request")
    .post(function(req, res) {
      Book.findById(req.body._id, function(err, bookDoc) {
        if (err) {
            handle[500](err, res);
        } else if (bookDoc == null) {
          res.sendStatus(404);
        } else {
          // Check if book is borrowed or requested
          if (bookDoc.borrower || bookDoc.request) {
            res.sendStatus(409);
          } else {
            // Update the user
            User.update(req.user._id, {$push: {requests : req.body._id}}, function(err) {
              if (err) {
                  handle[500](err, res);
              } else {
                Book.findByIdAndUpdate(req.body._id, {request: req.user._id}, function(err) {
                  if (err) {
                      handle[500](err, res);
                  } else {
                    res.json(bookDoc);
                  }
                });
              }
            });
          }
        }
      });
    })
    .delete(function(req, res) {



    });

  router.route("/deny")
    .post(function(req, res) {



    });

  router.route("/approve")
    .post(function(req, res) {



    });

  router.route("/returned")
    .post(function(req, res) {



    });
}
