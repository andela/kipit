var db_config = require("../../../src/config/config"),
    path = require("path");
describe("Database", function() {
    describe("Application", function() {
        beforeEach(function() {
            var node_env = process.env.NODE_ENV,
                databaseURI = process.env.KIPIT_DATABASE_URI,
                databaseName = path.basename(databaseURI);
        });
        it("should be connected to the correct database.", function() {
            expect(db_config[node_env].database).toEqual(databaseName);
        });
    });
});