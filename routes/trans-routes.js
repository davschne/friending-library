var express = require("express");
var authenticate = require(__dirname + "/../middleware/auth-bearer");
var User = require(__dirname + "/../models/User");
var Book = require(__dirname + "/../models/Book");
var handle = require("../lib/handle");

module.exports = function(router) {
  router.route("/request")
    .post(function(req, res) {



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
