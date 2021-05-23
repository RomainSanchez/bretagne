'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const http = require('http');
const https = require('https');
var fs = require("fs");
const app = module.exports = loopback();

// boot scripts mount components like REST API
boot(app, __dirname);

app.start = function() {
  let server = null;
  const options = {
    // key: fs.readFileSync('/var/www/bretagne-videos/privkey.pem').toString(),
    // cert: fs.readFileSync('/var/www/bretagne-videos/cert.pem').toString()
  };

  server = http.createServer(options, app);

  server.listen(app.get('port'), function() {
    const baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
