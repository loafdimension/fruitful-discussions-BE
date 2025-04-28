const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const app = require("../app/app");
const request = require("supertest");
const topics = require("../db/data/test-data/topics");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  xtest("200: Responds with an array of topic objects, each with a slug and properties description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        const topicsArr = res.body;
        expect(topicsArr).toHaveLength(3);
        topicsArr.forEach((topic) => {
          expect(typeof topic.description).toBe("string");
          expect(typeof topic.slug).toBe("string");
        });
      });
  });
  test.todo("400: Responds with an error when passed a bad request");
  test.todo(
    "404: Responds with an error when giiven a valid request, but no data exists"
  );
});

/*
test("Resonds with error 400 when passed bad request", () => {
  return request(app)
    .get("/api/treasures/banana")
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe("Bad request");
    });
});
test("Responds with a 404 error when given valid request, but no data exists", () => {
  return request(app)
    .get("/api/treasures/27")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("error message");
    });
});
*/
