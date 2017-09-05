'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify('./client/app.jsx')
  .transform(babelify, {presets: ['react', 'es2015']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./client/public'));
});