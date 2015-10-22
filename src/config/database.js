var pg = require('pg');
var config = require('./config');

module.exports = function(db){
	return new pg.Client(config[db]);
};