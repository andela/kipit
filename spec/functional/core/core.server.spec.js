var request = require("supertest"),
  path = require("path");
var relativePath = path.relative("spec/unit/core", "app/config/express"),
  app = require(relativePath);
describe("Server", function() {
  describe("should return appropriate server response.", function() {
    it("Should respond to /", function(done) {
      request(app)
        .get("/")
        .expect("Content-Type", /text\/html/)
        .expect(200)
        .end(function(err, res) {
          if (err) return err;
          done();
        });
    });
  });
});
