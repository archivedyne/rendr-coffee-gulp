var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

requireDir('./gulp_tasks', {recurse: true});

gulp.task('compile', ['hbs:compile', 'js:compile', 'less:compile']);
// gulp.task('init', ['init:js:compile']);
gulp.task('watch',   ['hbs:watch', 'js:watch', 'less:watch']);
gulp.task('server', function () {
  return runSequence('compile', 'serve', 'watch');
});
gulp.task('default', ['server']);

