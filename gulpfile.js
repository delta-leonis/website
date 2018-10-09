const gulp = require('gulp');
const browserify = require('browserify');
const pump = require('pump');
const source = require('vinyl-source-stream');
const buffer = require("vinyl-buffer");
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

exports.css = (cb) => {
  pump([gulp.src('_css/**/*.?(s)css'),
        sourcemaps.init(),
        autoprefixer(),
        concat('stylesheet.css'),
        sass(),
        cleanCSS(),
        sourcemaps.write('.'),
        gulp.dest('dist')], cb);
};

exports.js = (cb) => {
  var b = browserify({
    entries: './_js/main.js',
    debug: true
  });

  pump([b.bundle(),
        source('javascript.js'),
        buffer(),
        sourcemaps.init(),
        babel({presets: ['@babel/preset-env']}),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('dist')], cb);
};
