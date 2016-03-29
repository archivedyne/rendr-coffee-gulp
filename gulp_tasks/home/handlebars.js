var config = require('config');
var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var gulpPlumber = require('gulp-plumber');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');
var gutil = require('gulp-util');


var handleError = function (err) {
  gutil.log(err.toString());
  this.emit('end');
};
var plumber = function () {
  return gulpPlumber({ errorHandler : handleError });
};

//------------------------------------------------
// HANDLEBARS
//------------------------------------------------

var appName = config.apps.home.appPath;

gulp.task('hbs:compile', function () {
  return gulp.src('./apps/'+ appName +'/templates/**/[!__]*.hbs')
  .pipe(plumber())
  .pipe(handlebars({ wrapped : true }))
  .pipe(wrap('Handlebars.template(<%= contents %>)'))
  .pipe(wrap('templates["<%= file.relative.replace(/\\\\/g, "/").replace(/.js$/, "") %>"] = <%= file.contents %>;\n'))
  .pipe(concat('compiledTemplates.js'))
  .pipe(wrap('module.exports = function(Handlebars){\ntemplates = {};\n<%= contents %>\nreturn templates \n};'))
  .pipe(gulp.dest('apps/'+appName+'/templates/'));
});

gulp.task('hbs:watch', function () {
  return gulp.watch('./apps/'+appName+'/templates/**/*.hbs', [ 'hbs:compile' ]);
});
