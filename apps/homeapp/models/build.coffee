Base = require('./base.coffee')
module.exports = Base.extend(
  url: '/repos/:owner/:name'
  api: 'travis-ci')
module.exports.id = 'Build'
