var rendr   = require( 'rendr' );
var config = require( 'config' );
var debug = require( 'debug' )('development');
var DataAdapter = require('./../middleware/data_adapter');

var appName = config.apps.home.appName;

var server = rendr.createServer( {
  appData: config.appData,
  entryPath: __dirname + '/../../apps/' + appName,
  routes: appName,
  controllerDir: appName,
  dataAdapter: new DataAdapter(),
  defaultEngine: 'coffee',
  errorHandler: function ( req, res, next ) {
    debug('%s %s', req.method, req.url);
    // res.redirect('/error/');
    next();
  }
} );

module.exports = server;

