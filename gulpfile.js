var gulp = require('gulp');
var webpackConfig = require('./webpack.config.js');

var webpack = require("webpack-stream");

gulp.task('bundle', function(done) {
  return webpack(webpackConfig)
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['bundle']);