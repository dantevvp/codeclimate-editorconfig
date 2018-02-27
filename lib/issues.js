const { relative } = require('path')

module.exports = (files, cwd = '/code') => {
  const issues = []

  for (const file in files) {
    // reset path to be relative to project
    const path = relative(cwd, file)

    const details = files[file]

    for (const num in details) {
      const errors = details[num]

      for (const error of errors) {
        issues.push({
          type: 'issue',
          severity: 'minor',
          categories: ['Style'],
          check_name: error.code,
          description: error.message,
          location: {
            path,
            lines: {
              begin: error.line,
              end: error.line
            }
          }
        })
      }
    }
  }

  return issues
}
