// require modules
var express = require("express");
var db = require("./database");
var daofactory = require("./../createDAO");
var app = express();

var client = db();

app.get("/",function(req,res){
  res.json("Send me");
});

module.exports = app;