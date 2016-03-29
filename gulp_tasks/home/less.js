var config = require('config');
var gulp = require('gulp');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var less = require('gulp-less');

var handleError = function (err) {
  gutil.log(err.toString());
  this.emit('end');
};

var gulpPlumber = require('gulp-plumber');
var plumber = function () {
  return gulpPlumber({ errorHandler : handleError });
};

//------------------------------------------------
// LESS
//------------------------------------------------

var appName = config.apps.home.appPath;

gulp.task('less:compile', function () {
  gulp.src( './apps/' + appName + '/**/*.less' )
  .on('error', handleError)
  .pipe(plumber())
  .pipe(less())
  .pipe(concat('home.min.css'))
  .pipe(gulp.dest('./public/css/'));
});

gulp.task('less:watch', function () {
  return gulp.watch('./apps/'+appName+'/**/*.less', [ 'less:compile' ]);
});
