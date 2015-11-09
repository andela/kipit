var app = require("./config/express");
var server_Port = 3400;
// listen on server
var port = process.env.PORT || server_Port;
var server = app.listen(port);
console.log("Listening on port " + port);
