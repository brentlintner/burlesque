var server = require('./../server')

function elongate_option(short, long, opts) {
  if (opts.hasOwnProperty(short)) {
    opts[long] = opts[short]
    delete opts[short]
  }
}

function start(opts) {
  elongate_option('g', 'git-repo', opts)
  elongate_option('c', 'commit-range', opts)
  elongate_option('p', 'port', opts)
  elongate_option('t', 'theme', opts)
  server.start(opts)
}

module.exports = {
  default: start,
  start: start
}
