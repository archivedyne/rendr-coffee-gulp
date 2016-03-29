require('coffee-script/register');
var path = require('path');
var express = require('express');
var config = require('config');
var compress = require('compression');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app = express();

var server = require('./server/router/index');

/**
 * Initialize Express middleware stack.
 */
server.configure(function (expressApp) {
  expressApp.use(compress());
  expressApp.use(serveStatic(__dirname + '/public'));
  expressApp.use(bodyParser.json());
});

app.use('/', server.expressApp);

/**
 * Start the Express server.
 */
function start(){
  var port = 3000;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
    process.pid,
    port,
    app.get('env')
  );
}

if (require.main === module) start();

exports.app = app;
