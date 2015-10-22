// require modules
var express = require('express');
var db = require('./config/database');
var app = express();

// listen on server
var port = process.env.PORT;
var server = app.listen(port);

module.exports = app;