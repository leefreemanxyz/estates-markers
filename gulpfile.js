// require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
                  baseDir: "./"
              }    });
              gulp.watch("*.html").on("change", reload);
});

// scripts task
gulp.task('scripts', function() {
  return gulp.src(['./src/vendor/**/*.js', './src/custom/js/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

// styles task
gulp.task('styles', function() {
  return gulp.src(['./src/vendor/**/*.scss', './src/custom/**/*.scss'])
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});




// watch task
gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['scripts']);
  gulp.watch('./src/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch', 'browser-sync']);
