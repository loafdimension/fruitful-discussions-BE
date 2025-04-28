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
  test("200: Responds with an array of topic objects, each with a slug and properties description", () => {
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
  test("404: Responds with an error when attempting to access a non existent endpoint", () => {
    return request(app).get("/api/ninenine").expect(404);
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Gets an article by its ID and responds with an article object containing the specified properties below", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T08:12:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("400: Resonds with a 400 error when passed bad request", () => {
    return request(app)
      .get("/api/articles/beatle")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Bad request");
      });
  });
  test("404: Responds with a 404 error when given valid request, but no data exists", () => {
    return request(app)
      .get("/api/articles/30")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Error");
      });
  });
});
