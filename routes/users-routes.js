var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");

module.exports = function(router) {
  router.route("/")
    .get(function(req, res) {
      res.json(req.user);
    })
}
