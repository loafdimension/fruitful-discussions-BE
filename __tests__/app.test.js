const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const app = require("../app/app");
const request = require("supertest");
const topics = require("../db/data/test-data/topics");
const users = require("../db/data/test-data/users");

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
        expect(res.body).toMatchObject({
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
      .get("/api/articles/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Error");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of all article objects, which each have the following properties: author, title, article_id, topic, created_at, votes, article_img_url, and comment_count. Should be sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articlesArr = res.body;
        expect(articlesArr).toHaveLength(13);
        articlesArr.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an array of comments for the article id provided, which has the following properties: comment_id, votes, created_at, author, body, article_id. Should be sorted with most recent comments first", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject([
          {
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 16,
            author: "butter_bridge",
            created_at: "2020-04-06T11:17:00.000Z",
            comment_id: 1,
            article_id: 9,
          },
          {
            body: "The owls are not what they seem.",
            votes: 20,
            author: "icellusedkars",
            created_at: "2020-03-14T16:02:00.000Z",
            comment_id: 17,
            article_id: 9,
          },
        ]);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Successful post request. Should add a comment for an article which is selected by its parametric endpoint. The request should accept an object with a username and body property and respond with the posted comment.", () => {
    const testCommentToAdd = {
      username: "lurker",
      body: "i have a boat called LurkyMcLurkFace",
    };
    return request(app)
      .post("/api/articles/9/comments")
      .send(testCommentToAdd)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty("comment_id");
        expect(res.body).toHaveProperty("article_id");
        expect(res.body).toHaveProperty("author");
        expect(res.body).toHaveProperty("votes");
        expect(res.body).toHaveProperty("created_at");
        expect(res.body).toHaveProperty("body", testCommentToAdd.body);
      });
  });
  test("400: Responds with a 400 error when passed a body with valid fields, but the value of the field is invalid (invalid body data type)", () => {
    const testCommentToAdd = {
      username: "lurker",
      body: 3005,
    };
    return request(app)
      .post("/api/articles/9/comments")
      .send(testCommentToAdd)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Invalid data type in the body");
      });
  });
  test("400: Responds with a 400 error when passed a  body with valid fields, but the value of the field is invalid (invalid user)", () => {
    const testCommentToAdd = {
      username: "jelly bean eating book worm",
      body: "i live in article 9 eating jelly beans",
    };
    return request(app)
      .post("/api/articles/9/comments")
      .send(testCommentToAdd)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: User not found");
      });
  });
  test("400: Responds with a 400 error when passed a body that does not contain the correct fields", () => {
    const testCommentToAdd = {
      username: "lurker",
    };
    return request(app)
      .post("/api/articles/9/comments")
      .send(testCommentToAdd)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "400: Bad request - missing required information"
        );
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Updates an articles votes and responds with the updated article", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 41 })
      .expect(200)
      .then(({ body }) => {
        expect(body.updatedArticle.votes).toBe(41);
        expect(body.updatedArticle.article_id).toBe(2);
      });
  });
  test("400: Invalid data type received for inc_votes", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({
        inc_votes:
          "being here as a string is like being in the restricted section as harry potter",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400: Bad request. inc_votes must be a number");
      });
  });
  test("404: Given an article ID which is out of range and therefore has no data", () => {
    return request(app)
      .patch("/api/articles/456789")
      .send({ inc_votes: 50 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Article not found");
      });
  });
  test("400: Given an invalid article ID", () => {
    return request(app)
      .patch("/api/articles/turtle")
      .send({ inc_votes: 50 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "400: Invalid article ID. Please insert a number"
        );
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: Deletes the given comment by comment_id. Responds with a status 204 and no content", () => {
    return request(app)
      .delete("/api/comments/5")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  test("404: Attempts to delete a comment at a comment_id which does not exist (it is out of range)", () => {
    return request(app)
      .delete("/api/comments/456789")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Comment not found");
      });
  });

  test("400: Attempts to delete a resource referenced by an invalid ID", () => {
    return request(app)
      .delete("/api/comments/rocks")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "400: Invalid comment ID. Please insert a number"
        );
      });
  });
});

describe("GET /api/users", () => {
  test("200: Gets all users. Responds with an array of objects where each object has the properties of username, name, and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const usersArr = res.body;
        expect(usersArr).toHaveLength(4);
        usersArr.forEach((users) => {
          expect(typeof users.username).toBe("string");
          expect(typeof users.name).toBe("string");
          expect(typeof users.avatar_url).toBe("string");
        });
      });
  });
});
