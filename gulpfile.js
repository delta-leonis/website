const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');

const cssFiles = '_css/**/*.?(s)css';

exports.default = (cb) => {
  gulp.src(cssFiles)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('all.scss'))
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
  cb();
};