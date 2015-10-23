var request = require("supertest"),
    app = require("../../../src/server");
describe("Server", function() {
    describe("should return appropraite server response.", function() {
        it("Should response to /", function(done) {
            request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
        });
    });
});