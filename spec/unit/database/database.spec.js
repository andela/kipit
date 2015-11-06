var dbConfig = require("../../../src/config/config"),
  path = require("path");
describe("Database", function() {
  describe("Application", function() {
    beforeEach(function() {
        databaseURI = process.env.KIPIT_DATABASE_URI,
        databaseName = path.basename(databaseURI);
    });
    it("should be connected to the correct database.", function() {
      expect(dbConfig.db.database).toEqual(databaseName);
    });
  });
});