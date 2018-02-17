const { existsSync, statSync } = require('fs')
const { join } = require('path')
const glob = require('fast-glob')
const Lintspaces = require('lintspaces')

const processIssues = require('./lib/process-issues')

// lintspaces configuration
const ignores = [
  'js-comments',
  'c-comments',
  'java-comments',
  'as-comments',
  'xml-comments',
  'html-comments',
  'python-comments',
  'ruby-comments',
  'applescript-comments'
]

module.exports = (config = {}, output = process.stdout, cwd = '/code') => {
  // default values
  let exclude = config.exclude_paths || []
  let include = config.include_paths || ['**']
  const editorconfig = config.editorconfig || join(cwd, '.editorconfig')

  // prep paths for use with glob
  // include = include.map(path => path.replace(/^\/+/, ''))
  include = include.map(path => existsSync(path) && statSync(path).isDirectory() ? join(path, '**') : path)
  exclude = exclude.map(path => `!${join(path, '**')}`)

  return new Promise((resolve, reject) => {
    if (!existsSync(editorconfig) || !statSync(editorconfig).isFile()) {
      return reject(new Error('.editorconfig file required'))
    }

    // setup validator
    const lintspaces = new Lintspaces({ editorconfig, ignores })

    const stream = glob.stream(include.concat(exclude), { cwd, absolute: true })

    stream.once('error', reject)
    stream.on('data', file => lintspaces.validate(file))
    stream.once('end', () => {
      const files = lintspaces.getInvalidFiles()
      const issues = processIssues(files, cwd)

      issues.forEach(issue => output.write(JSON.stringify(issue) + '\0'))

      resolve()
    })
  })
}
