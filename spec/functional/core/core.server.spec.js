var request = require("supertest"),
    app = require("server");
describe("Server : ", function() {
    describe("Server should return appropraite server response.", function() {
        it("should response to /", function(done) {
            request(app).get('/').expect('Content-Type', /json/).expect(200).end(function(err, res) {
                if (err) throw err;
            });
        });
    });
});