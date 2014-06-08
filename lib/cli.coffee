optimist = require 'optimist'
help = require './cli/help'

interpret = () ->
  argv = optimist.argv
  cmd = if argv._.length > 0 then argv._[0] else 'server'
  subcmd = if argv._.length > 1 then argv._[1] else 'default'

  help.default(subcmd) if cmd == 'help'
  require('./cli/' + cmd)[subcmd](argv) if cmd != 'help'

module.exports =
  interpret: interpret
