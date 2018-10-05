const gulp = require('gulp');
const pump = require('pump');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

exports.css = (cb) => {
  gulp.src('_css/**/*.?(s)css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('all.scss'))
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
  cb();
};

exports.js = (cb) => {
  pump([gulp.src([
          'node_modules/svg.easing.js/dist/svg.easing.min.js',
          'node_modules/babel-polyfill/dist/polyfill.min.js',
          '_js/svgblueprint.js',
          '_js/svgbuilder.js',
          '_js/main.js'
        ]),
        sourcemaps.init(),
        concat('javascript.js'),
        babel({presets: ['@babel/preset-env']}),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('dist')], cb);
};
