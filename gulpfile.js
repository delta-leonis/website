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
  pump([gulp.src([
          'node_modules/babel-polyfill/dist/polyfill.js',
          // 'node_modules/particles.js/particles.js',
          'node_modules/svg.js/dist/svg.js',
          'node_modules/svg.easing.js/dist/svg.easing.js',
          'node_modules/vivus/dist/vivus.js',
          '_js/svgblueprint.js',
          '_js/svgbuilder.js',
          '_js/main.js'
        ]),
        sourcemaps.init(),
        babel({presets: ['@babel/preset-env']}),
        concat('javascript.js'),
        uglify(),
        sourcemaps.write('.'),
        gulp.dest('dist')], cb);
};
