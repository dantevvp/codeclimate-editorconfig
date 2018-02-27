const { test } = require('tap')
const issues = require('../lib/issues')

const expected = require('./fixtures/issues.json')
const source = require('./fixtures/lintspaces.json')

test('process issues', assert => {
  assert.plan(1)

  const result = issues(source, '/code')

  assert.same(expected, result)
})

test('cwd defaults to /code', assert => {
  assert.plan(1)

  const result = issues(source)

  assert.same(expected, result)
})
