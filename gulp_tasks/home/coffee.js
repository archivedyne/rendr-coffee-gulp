var config = require('config');
var gulp = require('gulp');
var glob = require('glob');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
// var uglify = require('gulp-uglify');

var handleError = function (err) {
  gutil.log(err.toString());
  this.emit('end');
};

var gulpPlumber = require('gulp-plumber');
var plumber = function () {
  return gulpPlumber({ errorHandler : handleError });
};

//------------------------------------------------
// BROWSERIFY
//------------------------------------------------

var appName = config.apps.home.appPath;
var reg = new RegExp("^" + appName);

var rendrClientFiles = glob.sync('rendr/{client,shared}/**/*.js', { cwd : './node_modules/' });
var rendrModules = rendrClientFiles.map(function (file) {
  return file.replace('.js', '');
});

var getBundler = function (globs) {
  var bundler, files;

  bundler = browserify({
    extentions: [ '.coffee', '.js' ],
    transforme: 'coffeeify',
    insertGlobals: false,
    debug: true
  });
  globs.forEach(function (pattern) {
    files = glob.sync(pattern, { cwd : './apps/' });
    files.forEach(function (file) {
      var moduleName = file.replace(/(.js|.coffee)$/, '').replace(reg, 'app');
      bundler.require('./apps/' + file, { expose: moduleName});
    });
  });

  rendrModules.forEach(function (moduleName) {
    bundler.require(moduleName);
  });

  bundler.require('rendr-handlebars/index.js', {expose: 'rendr-handlebars'});
  bundler.require('handlebars/runtime.js', {expose: 'handlebars'} );
  bundler.require('./bower_components/jquery/jquery.min.js', { expose : 'jquery' });
  return bundler;
};

gulp.task('js:compile', ['hbs:compile'], function () {
  return getBundler([ appName+'/**/*.coffee', appName+'/**/*.js' ])
  .transform('coffeeify')
  .bundle()
  .on('error', handleError)
  .pipe(plumber())
  .pipe(source('home.min.js'))
  // .pipe(buffer())
  // .pipe(uglify())
  .pipe(gulp.dest('./public/js/'));
});

gulp.task('js:watch', function () {
  return gulp.watch('./apps/'+appName+'/**/*.coffee', [ 'js:compile' ]);
});
