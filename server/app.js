'use strict';


module.exports = function(app) {

  var morgan = require('morgan');             // log requests to the console (express4)
  var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

  var cors = require('cors');
  var express  = require('express');
  var path = require('path');


  app.use(express.static(path.resolve(__dirname+'/../')));                 // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride());
  app.use(cors());

// listen (start app with node server.js) ======================================

  app.get('/', function(req, res) {
    res.sendFile(path.join(path.resolve(__dirname+'/../'),'index.html'));
  });

};