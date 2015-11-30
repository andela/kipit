// require modules
var express = require("express");
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
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
app.use(morgan('dev'));

app.use('/api', router);

app.get('/', function(req, res){
 res.json('I am here');
});

module.exports = app;
