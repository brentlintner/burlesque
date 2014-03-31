var
  logger = require('./logger'),
  child_process = require('child_process')

function array_from(obj) {
  return Object.keys(obj).reduce(function (array, key) {
    return array.push(key), (obj[key] ?
                     array.push(obj[key]) : null), array
  }, [])
}

function parse(stdout) {
  var data = stdout
              .split('--')
              .filter(function (i) { return !!i })

  function line(num, str) {
    return str.split('\n')[num]
  }

  function after(num, str) {
    var count = 0, d = []
    str.split('\n').forEach(function (line) {
      if (count > num) d.push(line)
      else count++
    })
    return d.join('\n').replace(/\n\n$/, '')
  }

  return data.reverse().map(function (commit) {
    return {
      sha: line(1, commit),
      author: line(2, commit),
      adate: line(3, commit),
      committer: line(4, commit),
      cdate: line(5, commit),
      title: line(6, commit),
      body: after(6, commit)
    }
  })
}

function git(repo) {
  return {
    cmd: function (args, opts, callback) {
      var cmd = 'git ' +
                    args.join(' ') + ' ' +
                    array_from(opts).join(' ')
      child_process.exec(cmd, {cwd: repo}, callback)
    }
  }
}

function scrape(repo, range, callback) {
  var log = logger.create('parser')
  git(repo).cmd(
    ['log', range],
    // sha\n author\n author-date\n committer\n
    // committer-date\n title\n body\n
    {"--pretty='--%n%H%n%an%n%ar%n%cn%n%cr%n%s%n%b%n'": null},
    function (err, stdout, stderr) {
      if (stderr) log.warn(stderr)
      if (err) throw err
      callback(parse(stdout))
    })
}

module.exports = {
  scrape: scrape
}
