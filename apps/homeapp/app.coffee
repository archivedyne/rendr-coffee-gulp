BaseApp = require('rendr/shared/app')
handlebarsHelpers = require('./lib/handlebarsHelpers.coffee')

module.exports = BaseApp.extend(
  initialize: ->
    @templateAdapter.registerHelpers handlebarsHelpers
    return
  start: ->
    # Show a loading indicator when the app is fetching.
    @router.on 'action:start', (->
      @set loading: true
      return
    ), this
    @router.on 'action:end', (->
      @set loading: false
      return
    ), this
    # Call 'super'.
    BaseApp::start.call this
    return
)
