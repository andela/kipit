var pg = require('pg');
var config = require('./config.js');

module.exports = function(db){
	return new pg.Client(config[db]);
};