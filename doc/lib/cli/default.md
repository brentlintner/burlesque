Usage
=====

The CLI defaults to the `server.start` method.

  burlesque cmd [subcmd] [--flag value]

## Options

* `-g/--git-repo`       path to repository
* `-c/--commit-range`   commit revision range (see `man gitrevisions`)
* `-t/--theme`          reveal.js theme to use
* `-p/--port`           port that the web server runs on

## Example

Create a slideshow from `my_branch` to `master`, using the
`solarized` reveal.js theme, on `http://localhost:5050`.

    burlesque -g my_repo -c master..my_branch -t solarized -p 5050
