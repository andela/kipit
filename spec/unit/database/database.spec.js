var path = require("path");
var relativePath = path.relative("spec/unit/database", "app/config/config");
var dbConfig = require(relativePath);
var databaseName;
describe("Database", function() {
  describe("Application", function() {
    beforeEach(function() {
      databaseName = path.basename(process.env.KIPIT_TEST_DATABASE_URI);
    });
    it("should be connected to the correct database.", function() {
      expect(dbConfig.db.database).toEqual(databaseName);
    });
  });
});
