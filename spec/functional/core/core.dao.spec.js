// Define test for DAO factory
var path = require("path");
var daofactory = require(path.relative("spec/fucntional/core", "src/createDAO"));
var db = require(path.relative("spec/fucntional/core", "src/config/database"));

var client = db();
var Users = daofactory("Users", client, sampleModel);

var sampleModel = {
  "table": "TestUsers",
  "primaryKey": "username",
  "constraints": {
    "check": [{
      "id": "username_not_empty",
      "colref": "username !=  '' "
    }],
    "unique": {
      "id": "unique_users",
      "colref": "username"
    }
    // "foreignKey": {
    //   "cols": "username",
    //   "refs": "tablename (cols)"
    // }
  },
  "columns": {
    "username": {
      "type": "varchar(20)",
      // "defaultval": "",
      "constraints": {
        "allowNull": false,
        "unique": {
          "id": "unique_userme"
        },
        "primaryKey": true
      }
      // },
      // "check": {
      //   "id": "username",
      //   "colref": "username !== '' "
      // }
      // },
      // "references": {
      //   "refs": " Accounts"
      // }
    },
    "password": {
      "type": "varchar(20)",
      // "defaultval": "",
      "constraints": {
        "allowNull": false,
        "unique": {
          "id": "password"
        }
      }
      // },
      // "check": {
      //   "id": "password",
      //   "colref": "password !== '' "
      // }
      // },
      // "references": {
      //   "refs": " Accounts"
      // }
    }
  }
};

var sampleQueryDefinition = {
  // filter values and operators for where statement
  "where": {
    // nested operand - contains array of operands
    "and": [
      // innner operand 1 of "and"
      {
        "eq": {
          "username": ["Mary", "Shelley"],
          "password": ["franskestein", "monster"]
        }
      },
      // inner operand 2 of "and"
      {
        "gt": {
          "id": "0",
          "price": "56"
        }
      }
    ],
    // non nested operand
    "lt": {
      "id": "7",
      "price": "90"
    },
    // operator for complex queries 
    // e.g ("and statement") operator ("lt statement")
    "operator": "or"
      //////// ends of filter vaues
  },
  // order of columns
  "orderby": ["username"],
  // order pattern
  "orderwith": "desc",
  // columns in databse to be reported
  "cols": ["username", "password"],
  // values to be inserted or updated
  "values": {
    // columns for update or insert
    "field": ["username", "password"],
    // value for update or insert
    "value": [
      ["Aragon", "Gondor"],
      ["Legolas", "Elf"]
    ]
  }
};

// Users.find(sampleQueryDefinition, function(x) {
//   console.log(x);
// });

describe("Data Access Object", function() {
  describe("Implements a factory pattern", function() {
    it("createDAO is a function", function() {
      expect(daofactory).toEqual(jasmine.any(Function));
    });
    // it("createDAO is not an object prototype", function() {
    //   expect(Users.constructor).not.toEqual(jasmine.any(Object));
    // });
    it("returns an object", function() {
      expect(Users).toEqual(jasmine.any(Object));
    });
  });
  describe("Contains basic data access methods", function() {
    it("Contains find, findAll, delete, insert, update methods", function() {
      expect(Users.find).toBeDefined();
      expect(Users.findAll).toBeDefined();
      expect(Users.delete).toBeDefined();
      expect(Users.insert).toBeDefined();
      expect(Users.update).toBeDefined();
    });
  });
});