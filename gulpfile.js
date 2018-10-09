const gulp = require('gulp');
const browserify = require('browserify');
const pump = require('pump');
const source = require('vinyl-source-stream');
const buffer = require("vinyl-buffer");
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

exports.css = (cb) => {
  pump([gulp.src('_css/main.scss'),
        sourcemaps.init(),
        autoprefixer(),
        sass(),
        cleanCSS(),
        sourcemaps.write('.'),
        gulp.dest('dist')], cb);
};

exports.js = (cb) => {
  pump([browserify({
          entries:'./_js/main.js',
          debug: true,
          blacklist: ["useStrict"], // svg.easing.js breaks otherwise
          transform: [
            babelify.configure({
              presets: ["@babel/preset-env"]
            })
          ]
        }).bundle(),
        source('javascript.js'),
        buffer(),
        sourcemaps.init({loadMaps: true}),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('dist')], cb);
};
