# Delta Leonis website

### Getting started
The site is build using [Jekyll](https://jekyllrb.com/) and hosted [here](http://delta-leonis.github.io/website] on [GitHub Pages](https://pages.github.com/).
In order to develop using Jekyll make sure [ruby is installed](https://www.ruby-lang.org/en/documentation/installation/) on your system.

You could create a rvm gemset to keep your environment clean using `rvm use 2.4.4@website --create`.
In order to install the dependencies simply
```ruby
bundle install # will install all the dependencies
jekyll serve
# => Now browse to http://localhost:4000
```
When changing files jekyll will automatically rebuild the files.
If you install a [livereload](http://livereload.com/extensions/)-plugin for your browser ([firefox](https://addons.mozilla.org/en-US/firefox/addon/livereload/), [chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei), [safari](download.livereload.com/2.1.0/LiveReload-2.1.0.safariextz)) your browser can autoreload if you run `guard` next to `jekyll serve`.

### Directory structure
```
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
├── Gemfile          ; development dependencies
├── Guardfile        ; guard livereload config
└── index.md         ; entry point of the website
```

Note that the site will be generated in `_site`.
