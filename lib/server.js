var
  path = require('path'),
  express = require('express'),
  stylus = require('stylus'),
  logger = require('./logger'),
  parser = require('./parser'),
  views = path.join(__dirname, '..', 'views'),
  web_modules = path.join(__dirname, '..', 'web'),
  bower_modules = path.join(__dirname, '..', 'bower_modules'),
  node_modules = path.join(__dirname, '..', 'node_modules'),
  built_css_dest = path.join(__dirname, '..', 'web', '.css')

function render(view, opts) {
  return function (req, res, next) {
    res.render(view, opts || {})
  }
}

function check(opt, msg, log) {
  if (!opt) log.error(msg), process.exit(1)
}

function start(opts, callback) {
  var
    app = express(),
    log = logger.create('server'),
    repo = opts['git-repo'],
    range = opts['commit-range'],
    theme = opts['theme'],
    port = opts.port || 5000

  app.configure(function () {
    check(repo, "I need a --repo-url", log)
    check(range, "I need a --commit-range", log)

    app.use(function(req, res, next){
      log.info(req.method + ' ' + req.url), next()
    })

    app.set('view engine', 'jade')
    app.set('views', views)

    app.use(stylus.middleware({
      src: web_modules, dest: built_css_dest
    }))

    app.use(express.static(built_css_dest))
    app.use(express.static(web_modules))
    app.use(express.static(bower_modules))
    app.use(express.static(node_modules))
  })

  parser.scrape(repo, range, function (commits) {
    if (commits.length < 1) log.warn('empty commit range')

    app.get('/', render('gitshow', {
      commits: commits,
      theme: theme || 'default'
    }))

    log.info('lauching app on:')
    log.info('  http://localhost:' + port)

    app.listen(port, function () {
      if (callback) callback()
    })
  })
}

module.exports = {
  start: start
}
