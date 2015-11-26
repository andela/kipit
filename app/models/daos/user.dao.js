// Define model for users
var path = require("path");
var daofactory = require("./dao_factory");
var db = require(path.relative("app/models/daos", "app/config/database"));
var usermodel = require(path.relative("models/daos", "models/schemas/user.json"));

var client = db();

var Users = daofactory("Users", client, usermodel);

Users.syncdb().then(function(status) {
  return Users;
});

module.exports = Users;
































//query statements
var querystuffs = {
  "values": {
    // columns for update or insert
    "field": ["userName", "password", "email"],
    // value for update or insert
    "value": [
      ["Godson", "ahaku", "andela@ltr.com"],
      ["abu", "ini", "manul@ltr.com"]
    ]
  }
};
// find query
var findstuff = {
  "where": {
    "eq": {
      "username": "abu"
    }
  }
};
