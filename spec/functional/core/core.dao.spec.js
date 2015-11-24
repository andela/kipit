// Define test for DAO factory
var path = require("path");
var daofactory = require(path.relative("spec/fucntional/core", "src/models/daos/dao_factory"));
var db = require(path.relative("spec/fucntional/core", "src/config/database"));
var usermodel = require(path.relative("spec/fucntional/core", "src/models/schemas/user.json"));

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


var Users;

describe("Data Access Object", function() {

  describe("Implements a factory pattern", function() {

    beforeEach(function(done) {
      Users = daofactory("Users", client, usermodel);
      done();
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
      Users = daofactory("Users", client, usermodel);
      done();
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
      done();
    });

    //sample queries
    it("should sync model, and execute queries", function(done) {
      Users.syncdb().then(function(status) {
        console.log("Models synced successfully");
        Users.insert(sampleQueryDefinition, function(err, data) {
          if (err) {
            console.log(err);
            done();
          } else {
           expect(data.rowCount).toEqual(2);
            done();
          }
        });
      }).catch(function(err) {
        console.log("Error Syncing model", err);
        done();
      });
    });

  });

});