BaseView = require('../base.coffee')
module.exports = BaseView.extend(
  postRender: ->
    @stopListening()
    @listenTo @app, 'change:loading', @render
    $ = window.$
    $('body').css 'overflow', 'hidden'
    if @app.get('loading')
      $('body').css 'overflow', 'hidden'
    else
      $('body').css 'overflow', 'visible'
    return
  getTemplateData: ->
    data = BaseView::getTemplateData.call(this)
    data.loading = @app.get('loading')
    data
)
module.exports.id = 'global/loading'
