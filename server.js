var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var port = process.env.PORT || 3000;

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library", function(err) {
  if (err) console.log(err);
  else console.log("Opened connection to MongoDB");
});

var authRouter = express.Router();
var usersRouter = express.Router();
var booksRouter = express.Router();

require("./routes/auth-routes")(authRouter);
require("./routes/users-routes")(usersRouter);
require("./routes/books-routes")(booksRouter);

var db = mongoose.connection;

app.use(passport.initialize());

var authenticate = require("./middleware/auth-bearer");

app.use(express.static("public"));

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/api/users", authenticate, usersRouter);
app.use("/api/books", authenticate, booksRouter);

app.get("/api/test", authenticate, function(req, res) {
  res.send("Logged in as " + req.user.displayName);
});

app.listen(port, function() {
  console.log("Server running on port " + port);
});

process.on("exit", function() {
  mongoose.disconnect();
});
