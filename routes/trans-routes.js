var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");
var Book = require(__dirname + "/../models/Book");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.route("/request")
    .post(function(req, res) {
      Book.findById(req.body._id, function(err, bookDoc) {
        if (err) handle[500](err, res);
        else if (bookDoc == null) res.sendStatus(404);
        else {
          // Check if book is borrowed or requested
          if (bookDoc.borrower || bookDoc.request) res.sendStatus(409);
          else {
            // Update the user
            User.update({_id: req.user._id}, {$push: {requests : req.body._id}}, function(err) {
              if (err) handle[500](err, res);
              else {
                Book.findByIdAndUpdate(req.body._id, {request: req.user._id}, function(err, updatedBookDoc) {
                  if (err) handle[500](err, res);
                  else {
                    res.json(updatedBookDoc);
                  }
                });
              }
            });
          }
        }
      });
    })
    .delete(function(req, res) {
      Book.findByIdAndUpdate(req.body._id, {request: ""}, function(err, updatedBookDoc) {
        if (err) handle[500](err, res);
        else if (updatedBookDoc == null) res.sendStatus(404);
        else {
          User.update({_id: req.user._id}, {$pull: {requests : req.body._id}}, function(err) {
            if (err) handle[500](err, res);
            res.json(updatedBookDoc);
          })
        }
      });
    });

  router.route("/deny")
    .post(function(req, res) {
      Book.findById(req.body._id, function(err, bookDoc) {
        if (err) handle[500](err, res);
        else if (bookDoc == null) res.sendStatus(404);
        else {
          User.update({_id: bookDoc.request}, { $pull: {requests : req.body._id} }, function(err) {
            if (err) handle[500](err, res);
            else {
              Book.findByIdAndUpdate(req.body._id, {request: ""}, function(err, updatedBookDoc) {
                res.json(updatedBookDoc);
              });
            }
          });
        }
      });
    });

  router.route("/approve")
    .post(function(req, res) {
      Book.findById(req.body._id, function(err, bookDoc) {
        if (err) handle[500](err, res);
        else if (bookDoc == null) res.sendStatus(404);
        else {
          User.update({_id: bookDoc.request}, { $pull: {requests : req.body._id}, $push: {borrowing : req.body._id} }, function(err) {
            if (err) handle[500](err, res);
            else {
              Book.findByIdAndUpdate(req.body._id, {borrower: bookDoc.request, request: ""}, function(err, updatedBookDoc) {
                res.json(updatedBookDoc);
              });
            }
          });
        }
      });
    });

  router.route("/returned")
    .post(function(req, res) {
      Book.findById(req.body._id, function(err, bookDoc) {
        if (err) handle[500](err, res);
        else if (bookDoc == null) res.sendStatus(404);
        else {
          User.update({_id: bookDoc.borrower}, { $pull: {borrowing : req.body._id} }, function(err) {
            if (err) handle[500](err, res);
            else {
              Book.findByIdAndUpdate(req.body._id, {borrower: ""}, function(err, updatedBookDoc) {
                res.json(updatedBookDoc);
              });
            }
          });
        }
      });
    });
}
