'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');


gulp.task('sass', function () {
  return gulp.src("sass/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
  return gulp.src('./*.html')
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('sass', 'html', 'browser-sync', 'watch'))
