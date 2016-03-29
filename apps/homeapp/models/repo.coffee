Base = require('./base.coffee')
module.exports = Base.extend(
  url: '/repos/:owner/:name'
  idAttribute: 'name')
module.exports.id = 'Repo'
