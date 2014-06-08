fs = require("fs")
path = require("path")
logger = require("./../logger")
cli_doc = path.join(__dirname, "..", "..", "doc", "lib", "cli")

help = (subcmd) ->
  help_file = path.join(cli_doc, (subcmd or "help") + ".md")
  log = logger.create("cli")
  fs.readFile help_file, "utf-8", (err, data) ->
    if err
      log.error err
      log.error "The help file for the specified command name may not exist."
    else
      console.log data

module.exports =
  default: help
  help: help
