var request = require('request');
var config = require('config');
var debug = require('debug')('development');

function DataAdapter() {}

DataAdapter.prototype.request = function ( req, api, opt, cb ) {
  if ( arguments.length === 3 ) {
    cb = opt;
    opt  = {};
  }

  var options = {};
  options.url = config.api.protocol + '://' + config.api.host + api.path;
  options.headers = {
    "user-agent": "Cool-GitHub-App" // GitHub is happy with a unique user agent
  };
  options.method = api.method;

  var start = new Date().getTime();
  debug('%s %s ...', api.method, options.url);

  request(options, function(err, response, body) {
    if (err) return cb(err);

    var end = new Date().getTime();
    debug('%s %s %s %sms', api.method, options.url, response.statusCode, end - start);

    if (typeof body === 'string' && this.isJSONResponse(response)) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        err = e;
      }
    }
    cb(err, response, body);

  }.bind(this));
};

DataAdapter.prototype.isJSONResponse = function(response) {
  var contentType = response.headers['content-type'] || '';
  return contentType.indexOf('application/json') !== -1;
};

module.exports = DataAdapter;
