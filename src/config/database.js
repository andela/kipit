var pg = require("pg");
var config = require("./config");

module.exports = function() {
  return new pg.Client(config.db);
};