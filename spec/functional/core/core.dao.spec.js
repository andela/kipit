// Define test for DAO factory
var path = require("path");
var daofactory = require(path.relative("spec/fucntional/core", "src/models/daos/dao_factory"));
var db = require(path.relative("spec/fucntional/core", "src/config/database"));

var client = db();


var sampleModel = {
  "table": "TestUsers",
  "primaryKey": "username",
  "forcecreate": true, // use true when table should be dropped and recreated
  "constraints": {
    "check": [{
      "id": "username_not_empty",
      "colref": "username !=  '' "
    }], // must be an array of object(s)
    "unique": {
      "id": "unique_users",
      "colref": "username"
    },
    // "foreignKey": {
    //   "cols": "username", // can be an array of column names or just a column name
    //   "refs": "tablename [(cols)]" // table must have a primary key if cols is omitted
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
      //   "refs": " Accounts [(cols)]" // table must have a primary key if cols is omitted
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
    "or": [
        // innner operand 1 of "and"
        {
          "eq": {
            "username": ["Aragon", "Mary"],
            "password": ["Shelley", "Gondor"]
          }
        },
        // inner operand 2 of "and"
        {
          "eq": {
            "username": "Legolas"
          }
        }
      ]
      // // non nested operand
      // "lt": {
      //   "id": "7",
      //   "price": "90"
      // },
      // "ne": {
      //   "id": "7",
      //   "price": "90"
      // },
      // // operator for complex queries 
      // // e.g ("and statement") operator ("lt statement")
      // "operator": "or"
      //   //////// ends of filter vaues
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

var Users;

describe("Data Access Object", function() {

  describe("Implements a factory pattern", function() {

    beforeEach(function(done) {
      daofactory("Users", client, sampleModel, function(model) {
        Users = model;
        done();
      });
    });

    afterEach(function(done) {
      Users = undefined;
      done();
    });


    it("createDAO is a function", function(done) {
      expect(daofactory).toEqual(jasmine.any(Function));
      done();
    });
    // it("createDAO is not an object prototype", function() {
    //   expect(Users.constructor).not.toEqual(jasmine.any(Object));
    // });

    it("returns an object", function(done) {
      expect(Users).toEqual(jasmine.any(Object));
      done();
    });

  });

  describe("Contains basic data access methods", function() {

    beforeEach(function(done) {
      daofactory("Users", client, sampleModel, function(model) {
        Users = model;
        done();
      });
    });

    afterEach(function(done) {
      Users = undefined;
      done();
    });

    it("Contains find, findAll, delete, insert, update methods", function(done) {
      expect(Users.find).toBeDefined();
      expect(Users.findAll).toBeDefined();
      expect(Users.delete).toBeDefined();
      expect(Users.insert).toBeDefined();
      expect(Users.update).toBeDefined();

      //sample queries
      Users.insert(sampleQueryDefinition, console.log);

      Users.find(sampleQueryDefinition, console.log);

      done();
    });

  });


});