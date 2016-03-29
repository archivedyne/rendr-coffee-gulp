BaseClientRouter = require('rendr/client/router')
Router = 
module.exports = (options) ->
  BaseClientRouter.call this, options
  return

###*
# Set up inheritance.
###

Router.prototype = Object.create(BaseClientRouter.prototype)
Router::constructor = BaseClientRouter

Router::initialize = ->
  @on 'action:start', @trackImpression, this
  return

Router::trackImpression = ->
  if window._gaq
    _gaq.push [ '_trackPageview' ]
  return
