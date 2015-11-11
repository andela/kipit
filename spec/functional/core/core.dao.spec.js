// Define test for DAO factory
var path = require("path");
var daofactory = require(path.relative("spec/fucntional/core", "src/createDAO"));
var db = require(path.relative("spec/fucntional/core", "src/config/database"));

var client = db();
var Users = daofactory("Users", client, {
  "primaryKey ": "id",
  "table": "author"
});
console.log(Users.prototype);
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
    it("Contains find, findAll, delete methods", function() {
      expect(Users.find).toBeDefined();
      expect(Users.findAll).toBeDefined();
      expect(Users._delete).toBeDefined();
    });
  });
});