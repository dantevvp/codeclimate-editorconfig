// eslint-disable camelcase
const { join } = require('path')
const { test } = require('tap')
const { Writable } = require('stream')
const Ajv = require('ajv')
const editorconfig = require('..')

const schema = require('./schema')

const fixtures = join(__dirname, 'fixtures')

const ajv = new Ajv()

class Stream extends Writable {
  constructor () {
    super()
    this.data = []
  }

  write (chunk, encoding) {
    this.data.push(chunk)
  }

  getIssues () {
    if (this.data.length === 0) {
      return []
    }

    return this.data.join('').slice(0, -1).split('\0').map((json) => JSON.parse(json))
  }
}

function validate (config) {
  const stream = new Stream()

  return editorconfig(config, stream, fixtures).then(() => stream.getIssues())
}

test('fail if missing config', assert => {
  assert.plan(1)

  assert.rejects(editorconfig({}, null, fixtures))
})

test('Support EditorConfig native configuration', assert => {
  assert.plan(2)

  const config = {
    editorconfig: join(fixtures, '.config.a')
  }

  validate(config)
    .then(issues => {
      assert.equal(2, issues.length, 'should be invalid')
      assert.ok(ajv.validate(schema, issues), ajv.errors, 'issues should follow schema')
    })
})

test('Use `include_paths` from config.json as the "workspace" of files and paths to analyze', assert => {
  assert.plan(2)

  const config = {
    include_paths: [ join(fixtures, 'file.a') ],
    exclude_paths: [ join(fixtures, 'file.b') ],
    editorconfig: join(fixtures, '.config.a')
  }

  validate(config)
    .then(issues => {
      assert.equal(1, issues.length, 'should be invalid')
      assert.ok(ajv.validate(schema, issues), ajv.errors, 'issues should follow schema')
    })
})

test('Do not analyze files listed in exclude paths in a user\'s .codeclimate.yml', assert => {
  assert.plan(2)

  const config = {
    include_paths: [ fixtures ],
    exclude_paths: [ join(fixtures, 'file.b') ],
    editorconfig: join(fixtures, '.config.a')
  }

  validate(config)
    .then(issues => {
      assert.equal(1, issues.length, 'should be invalid')
      assert.ok(ajv.validate(schema, issues), ajv.errors, 'issues should follow schema')
    })
})
