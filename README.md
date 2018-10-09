# Delta Leonis website

## Getting started
The site is build using [Jekyll](https://jekyllrb.com/) and [gulp.js](https://gulpjs.com/) and hosted [here](http://delta-leonis.github.io/website) on [GitHub Pages](https://pages.github.com/).
In order to develop using Jekyll make sure [ruby](https://www.ruby-lang.org/en/documentation/installation/), and [npm](https://www.npmjs.com/) are installed on your system.

Run the following commands
```bash
gem install jekyll
npm install
gulp serve
# => Now browse to http://localhost:4000/website
```
If you install a [livereload](http://livereload.com/extensions/)-plugin for your browser ([firefox](https://addons.mozilla.org/en-US/firefox/addon/livereload/), [chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei), [safari](download.livereload.com/2.1.0/LiveReload-2.1.0.safariextz)) your browser will autoreload whenever files are changed.

## Gulp tasks


| `css`    | bundle and transpile stylesheet (to dist/main.css) |
| `js`     | bundle, autoprefix, browserify, and babelify javascript (to dist/javascript.js) |
| `assets` | run `css` and `js` tasks |
| `jekyll` | build the site without assets |
| `build`  | run `jekyll` and `assets` tasks |
| `watch`  | start `jekyll` in watchmode, and watch _scss and _js folder for changes. reload browser on change |
| `serve`  | run `assets` and `watch` tasks. |

## Directory structure
```shell
.
├── _includes        ; partial layout files
│   └── ...
├── _layouts         ; layout files
│   └── ...
├── _page_collection ; site content in markdown
│   └── ...
├── _scss            ; scss stylesheets
│   └── ...
├── assets           ; static files
│   └── ...
├── .circleci        ; CI configuration and scripts
│   └── ...
├── _site            ; build destination
│   └── ...
├── gulpfile.js      ; gulp tasks
├── _config.yml      ; Jekyll config
└── index.md         ; entry point of the website
``

## Deployment
Run `.circleci/deploy-ghpages.sh` in oder to build the site and deploy it to `http://delta-leonis.github.io/website`. Make sure you have Jekyll setup.
