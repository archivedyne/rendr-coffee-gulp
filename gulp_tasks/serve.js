var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function () {
  nodemon({
    script : 'index.js',
    ext    : 'js',
    ignore : [ 'public/', 'gulp', 'test/', 'node_modules/', 'gulpfile.js' ],
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'development'
    }
  });
});

