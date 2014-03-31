var
  minilog = require('minilog'),
  fs = require('fs')

minilog.pipe(minilog.backends.nodeConsole.formatLearnboost)
       .pipe(minilog.backends.nodeConsole)

function create(name) {
  return minilog(name)
}

module.exports = {
  create: create
}
