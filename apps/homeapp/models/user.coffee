Base = require('./base.coffee')
module.exports = Base.extend(
  url: '/users/:login'
  idAttribute: 'login')
module.exports.id = 'User'
