// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./SCSS/*.scss')//抓
  .pipe(sass())
  .pipe(gulp.dest('./CSS/'));//建立
});

gulp.task('watch', ['sass'], function () {
  gulp.watch('./SCSS/*.scss', ['sass']);
});