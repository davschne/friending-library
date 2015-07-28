'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var mocha = require("gulp-mocha");

var gulpDB = require("./gulp-db");

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

gulp.task("test", function() {
  return gulp.src("./test/*.js")
    .pipe(mocha({"reporter" : "nyan"}));
});

gulp.task("dbSetup", gulpDB.dbSetup);

gulp.task("dbBreakdown", gulpDB.dbBreakdown);
