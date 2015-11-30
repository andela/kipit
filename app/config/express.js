// require modules
var express = require("express");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./database");
var app = express();
var router = express.Router();

var routes = require('../routes');
routes(router);

var client = db();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

module.exports = app;
