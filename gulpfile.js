// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./Week3-Admin_order/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./Week3-Admin_order/CSS/'))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('./*.scss', ['sass']);
})