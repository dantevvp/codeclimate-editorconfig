module.exports = {
  type: 'array',
  items: {
    type: 'object',
    required: ['type', 'check_name', 'description', 'categories', 'location'],
    properties: {
      type: { const: 'issue' },
      check_name: { type: 'string' },
      description: { type: 'string' },
      content: { type: 'object' },
      categories: { type: 'array' },
      trace: { type: 'object' },
      remediation_points: { type: 'integer' },
      severity: { type: 'string', enum: ['info', 'minor', 'major', 'critical', 'blocker'] },
      location: {
        type: 'object',
        required: [ 'path', 'lines' ],
        properties: {
          path: { type: 'string' },
          lines: {
            type: 'object',
            required: ['begin', 'end'],
            properties: {
              begin: {
                type: 'number'
              },
              end: {
                type: 'number'
              }
            }
          }
        }
      }
    }
  }
}
