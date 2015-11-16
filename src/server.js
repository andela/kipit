var app = require("./config/express");
var serverPort = 3400;
// listen on server
var port = process.env.PORT || serverPort;
var server = app.listen(port);
console.log("Listening on port " + port);
