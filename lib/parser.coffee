logger = require("./logger")
child_process = require("child_process")
log = logger.create("parser")

array_from = (obj) ->
  Object.keys(obj).reduce ((array, key) ->
    array.push(key)
    ((if obj[key] then array.push(obj[key]) else null))
    array
  ), []

parse = (stdout) ->
  line = (num, str) ->
    str.split("\n")[num]

  after = (num, str) ->
    count = 0
    d = []
    str.split("\n").forEach (line) ->
      if count > num then d.push line else count++

    d.join("\n").replace /\n\n$/, ""

  data = stdout.split("--").filter((i) -> !!i)

  data.reverse().map (commit) ->
    sha: line(1, commit)
    author: line(2, commit)
    adate: line(3, commit)
    committer: line(4, commit)
    cdate: line(5, commit)
    title: line(6, commit)
    body: after(6, commit)

git = (repo) ->
  cmd: (args, opts, callback) ->
    cmd = "git " + args.join(" ") + " " + array_from(opts).join(" ")
    child_process.exec cmd,
      cwd: repo,
      callback

scrape = (repo, range, callback) ->
  git(repo).cmd ["log", range],
    # sha\n author\n author-date\n committer\n
    # committer-date\n title\n body\n
    "--pretty='--%n%H%n%an%n%ar%n%cn%n%cr%n%s%n%b%n'": null,
    (err, stdout, stderr) ->
      log.warn stderr  if stderr
      throw err if err
      callback parse(stdout)

module.exports = scrape: scrape
