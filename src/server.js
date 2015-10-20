// require modules
var express = require('express');
var db = require('./database.js');
var app = express();

// instance of database connection
var client = db('staging');
client.connect();

//test query
client.query('psql statement', function(err, results){
	if(err) return console.error(err);
	var rs = results.rows; 
	gets(rs);
});

// get method for server
function gets(rs){
	app.get('/', function(req, res){
	res.send(rs);
	});
}

// listen on server
var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address.port;
});