  // Define model for users
  var path = require("path");
  var daofactory = require("./dao_factory");
  var db = require(path.relative("src/models/daos", "src/config/database"));
  var usermodel = require(path.relative("models/daos", "models/schemas/user.json"));

  var client = db();

  var sampleQueryDefinition = {
    // filter values and operators for where statement
    "where": {
      "or": [
        // innner operand 1 of "and"
        {
          "eq": {
            "userName": ["Aragon", "Mary"],
            "password": ["Shelley", "Gondor"]
          }
        },
        // inner operand 2 of "and"
        {
          "eq": {
            "userName": "Legolas"
          }
        }
      ]

    },
    // order of columns
    "orderby": ["userName"],
    // order pattern
    "orderwith": "desc",
    // columns in databse to be reported
    "cols": ["userName", "password"],
    // values to be inserted or updated
    "values": {
      // columns for update or insert
      "field": ["userName", "password", "email"],
      // value for update or insert
      "value": [
        ["Aragon", "Gondor", "aragon@ltr.com"],
        ["Legolas", "Elf", "legolas@ltr.com"]
      ]
    }
  };

  var Users = daofactory("Users", client, usermodel);

  Users.syncdb().then(function(status) {
    console.log(status);
    if (status.command === "CREATE") {
      Users.insert(sampleQueryDefinition, console.log);
    } else {
      console.log("Error Syncing model");
    }
  });