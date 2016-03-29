module.exports =
  index: (params, callback) ->
    err = ''
    res = {}
    callback(err, 'home/index', res)
    return
  error: (params, callback) ->
    err = ''
    res = {}
    callback(err, 'home/error', res)
    return
