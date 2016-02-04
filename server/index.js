// call the packages we need
// server.js
// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var PORT = process.env.PORT || 8088;
// configuration =================
require('./app')(app);
require('./routes')(app);

process.on('uncaughtException', function (err) {
  console.log(err);
});
console.log('Server running on port ', PORT)
app.listen(PORT);
