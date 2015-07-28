var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");

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

app.use(bodyParser);

app.use("/auth", authRouter);
app.use("/api/users", authenticate, usersRouter);
app.use("/api/books", authenticate, booksRouter);

app.get("/api/test", authenticate, function(req, res) {
  res.send("Logged in as " + req.user.displayName);
});

app.listen(3000);
