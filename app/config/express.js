// require modules
var express = require("express");
var db = require("./database");
var client = db();
var app = express();

app.use(express.static('public'));

module.exports = app;
