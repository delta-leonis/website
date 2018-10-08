# Delta Leonis website

## Getting started
The site is build using [Jekyll](https://jekyllrb.com/) and hosted [here](http://delta-leonis.github.io/website) on [GitHub Pages](https://pages.github.com/).
In order to develop using Jekyll make sure [ruby is installed](https://www.ruby-lang.org/en/documentation/installation/) on your system.

Run the following commands
```ruby
gem install jekyll
jekyll serve
# => Now browse to http://localhost:4000/website
```
When changing files jekyll will automatically rebuild the files. If you install a [livereload](http://livereload.com/extensions/)-plugin for your browser ([firefox](https://addons.mozilla.org/en-US/firefox/addon/livereload/), [chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei), [safari](download.livereload.com/2.1.0/LiveReload-2.1.0.safariextz)) your browser can autoreload if you run `jekyll serve` with the `--livereload` flag.

## Directory structure
```shell
.
├── _config.yml      ; Jekyll config
├── _includes        ; partial layout files
│   └── ...
├── _layouts         ; layout files
│   └── ...
├── _page_collection ; site content in markdown
│   └── ...
├── _sass            ; scss stylesheets
│   └── ...
├── assets           ; static files
│   └── ...
├── .circleci        ; CI configuration and scripts
│   └── ...
├── _site            ; build destination
│   └── ...
└── index.md         ; entry point of the website
``

## Deployment
Run `.circleci/deploy-ghpages.sh` in oder to build the site and deploy it to `http://delta-leonis.github.io/website`. Make sure you have Jekyll setup.
