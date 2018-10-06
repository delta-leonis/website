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
When changing files jekyll will automatically rebuild the files.

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
