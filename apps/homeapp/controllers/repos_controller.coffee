module.exports =
  index: (params, callback) ->
    spec = collection:
      collection: 'Repos'
      params: params
    @app.fetch spec, (err, result) ->
      callback err, 'repos/index', result
      return
    return
  show: (params, callback) ->
    spec =
      model:
        model: 'Repo'
        params: params
        ensureKeys: [
          'language'
          'watchers_count'
        ]
      build:
        model: 'Build'
        params: params
    @app.fetch spec, (err, result) ->
      callback err, 'repos/show', result
      return
    return
