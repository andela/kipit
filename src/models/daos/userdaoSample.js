  // Define model for users
  var path = require("path");
  var daofactory = require("./dao_factory");
  var db = require(path.relative("src/models/daos", "src/config/database"));
  var usermodel = require(path.relative("models/daos", "models/schemas/user.json"));

  var client = db();
  var Users;

  daofactory("Users", client, usermodel, function(model) {
    Users = model;
  });

  // functions specific to Users model