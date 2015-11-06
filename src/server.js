var app = require("./config/express");

// listen on server
var port = process.env.PORT || 3400;
var server = app.listen(port);
console.log("Listening on port " + port);
