var path = require("path");
var relativePath = path.relative("spec/unit/database", "src/config/config");
var dbConfig = require(relativePath);
var databaseURI, databaseName;
describe("Database", function() {
  describe("Application", function() {
    beforeEach(function() {
      databaseURI = process.env.KIPIT_DATABASE_URI;
      databaseName = path.basename(databaseURI);
    });
    it("should be connected to the correct database.", function() {
      expect(dbConfig.db.database).toEqual(databaseName);
    });
  });
});