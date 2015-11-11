// require modules
var express = require("express");
var db = require("./database");
var app = express();

var client = db();

module.exports = app;