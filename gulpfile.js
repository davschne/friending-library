'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var mongoose = require("mongoose");

gulp.task('sass', function() {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifyCSS({compaibility: 'ie8'}))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('webpack', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
     }))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js/'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./public/'));
});

gulp.task('copy-fonts', function() {

  return gulp.src('./app/**/*.otf')
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['sass', 'copy', 'copy-fonts', 'webpack']);

gulp.task('default', ['build']);

gulp.task("dbSetup", function() {
  var user1 = {
    _id: "12345",
    displayName: "Philip",
    access_token: "v583ms",
    books: [],
    borrowing: []
  };
  var user2 = {
    _id: "16829",
    displayName: "David",
    access_token: "cvasr32",
    books: [],
    borrowing: []
  };
  var user3 = {
    _id: "02486",
    displayName: "Brandon",
    access_token: "kjlewq02",
    books: [],
    borrowing: []
  };
  var user4 = {
    _id: "08473",
    displayName: "Colin",
    access_token: "uiowqe879803",
    books: [],
    borrowing: []
  };

  var User = require("./models/User");
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");

  User.create(user1, function(err,user1) {
    User.create(user2, function(err,user2) {
      User.create(user3, function(err,user3) {
        User.create(user4, function(err,user4) {
          console.log("users added");
          mongoose.connection.close();
        });
      });
    });
  });
});

gulp.task("dbBreakdown", function() {
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/friending-library");
  mongoose.connection.once("open", function() {
    mongoose.connection.db.dropDatabase(function() {
      console.log("db dropped");
      mongoose.connection.close();
    });
  });
});
