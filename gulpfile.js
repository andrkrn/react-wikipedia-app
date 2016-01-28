var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('css', function () {
  return gulp.src('css/**/*.css')
    .pipe(watch('css/**/*.css'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['webserver', 'css'])
