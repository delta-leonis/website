const gulp = require('gulp');
const browserify = require('browserify');
const pump = require('pump');
const source = require('vinyl-source-stream');
const buffer = require("vinyl-buffer");
const sass = require('gulp-sass');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const log = require('fancy-log');
const watch = require('gulp-watch');

gulp.task('css', (cb) => {
  pump([gulp.src([
          '_scss/_reset.scss',
          '_scss/_declarations.scss',
          '_scss/_style.scss',
        ]),
        sourcemaps.init(),
        concat('main.css'),
        sass(),
        autoprefixer(),
        cleanCSS(),
        sourcemaps.write('.'),
        gulp.dest('dist')], cb);
});

gulp.task('js', (cb) => {
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
});

gulp.task('jekyll', (cb) => {
  exec('jekyll build', (error, stdout, stderr) => {
    log(stdout);
    return cb(error !== null ? 'ERROR: Jekyll process exited with code: '+error.code : null);
  });
});

gulp.task('watch', (cb) => {
  let jekyll = spawn('jekyll', ['serve', '--livereload'], {
    stdio: 'inherit'
  });

  watch(['_scss/*.scss'], gulp.task('css'));
  watch(['_js/*.js'], gulp.task('js'));

  return jekyll.on('exit', (code) => {
    return cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('assets', gulp.parallel('js', 'css'));
gulp.task('build',  gulp.series('assets', 'jekyll'));
gulp.task('serve',  gulp.parallel('assets', 'watch'));
