var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");
var Book = require(__dirname + "/../models/Book");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.route("/:userid")
    .get(function(req, res) {
      User.findById(req.params.userid).populate("books").exec(function(err, userDoc) {
        if (err) {
          handle[500](err, res);
        } else {
          res.json(userDoc)
        }
      });
    });
}
