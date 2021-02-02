const app = require("./server"); // Link to your server file
const request = require("supertest");

describe("GET /", function () {
  it("responds with HTML", function (done) {
    request(app)
      .get("/")
      .set("Accept", "text/html")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200, done);
  });
});
