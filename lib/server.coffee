path = require("path")
express = require("express")
stylus = require("stylus")
logger = require("./logger")
parser = require("./parser")
views = path.join(__dirname, "..", "views")
web_modules = path.join(__dirname, "..", "web")
bower_modules = path.join(__dirname, "..", "bower_modules")
node_modules = path.join(__dirname, "..", "node_modules")
built_css_dest = path.join(__dirname, "..", "web", ".css")

render = (view, opts) ->
  (req, res, next) ->
    res.render view, opts or {}

check = (opt, msg, log) ->
  unless opt
    log.error(msg)
    process.exit(1)

start = (opts, callback) ->
  app = express()
  log = logger.create("server")

  repo = opts["git-repo"]
  range = opts["commit-range"]
  theme = opts["theme"]

  port = opts.port or 5000

  app.configure ->
    check repo, "I need a --repo-url", log
    check range, "I need a --commit-range", log

    app.use (req, res, next) ->
      log.info(req.method + " " + req.url)
      next()

    app.set "view engine", "jade"
    app.set "views", views

    app.use stylus.middleware(
      src: web_modules
      dest: built_css_dest
    )

    app.use express.static(built_css_dest)
    app.use express.static(web_modules)
    app.use express.static(bower_modules)
    app.use express.static(node_modules)

  parser.scrape repo, range, (commits) ->
    log.warn "empty commit range"  if commits.length < 1

    app.get "/", render("gitshow",
      commits: commits
      theme: theme or "default"
    )

    log.info "lauching app on:"
    log.info "  http://localhost:" + port

    app.listen port, ->
      callback()  if callback

module.exports = start: start
