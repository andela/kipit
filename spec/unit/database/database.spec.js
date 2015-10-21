var db_config = require('config');
describe("Database : ", function() {
    describe("Application", function() {
        it("should be connected to the correct database on development.", function() {
            expect(db_config.development.database).toBe('kipit');
        });
        it("should be connected to the correct database on staging", function() {
            expect(db_config.staging.database).toBe('circle-test');
        });
    });
});