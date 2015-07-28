'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

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

gulp.task('copy-html', function() {
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

gulp.task('copy-images', function() {

  return gulp.src('./app/**/*.png')
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['sass', 'copy-html', 'copy-fonts', 'copy-images', 'webpack']);

gulp.task('default', ['build']);
