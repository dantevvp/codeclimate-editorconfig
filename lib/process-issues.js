const { relative } = require('path')

function sort (files) {
  let final = {}

  for (let file in files) {
    // add line number to each error
    for (let line in files[file]) {
      final[file] = files[file][line].map(error => {
        error.line = Number(line)
        return error
      })
    }
  }

  return final
}
module.exports = (files, cwd) => {
  const issues = []

  // clean up the data
  files = sort(files)

  for (let path in files) {
    for (let error of files[path]) {
      issues.push({
        type: 'issue',
        severity: 'minor',
        categories: ['Style'],
        check_name: error.code,
        description: error.message,
        location: {
          // reset path to be relative to project
          path: relative(cwd, path),
          lines: {
            begin: error.line,
            end: error.line
          }
        }
      })
    }
  }

  return issues
}
