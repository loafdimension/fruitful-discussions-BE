const newsData = require("../../db/data/test-data/index");
const JSONEndPoints = require("../../endpoints.json");
const {
  selectTopics,
  selectArticlesByID,
  selectArticles,
  selectArticleCommentsByArticleID,
  insertArticleCommentByArticleID,
} = require("../model/model");

const getAPI = (req, res, next) => {
  res.status(200).send({ endpoints: JSONEndPoints });
};

const getTopics = (req, res, next) => {
  return selectTopics()
    .then((topics) => {
      res.status(200).send(topics);
    })
    .catch((err) => {
      next(err);
    });
};

const getArticlesByID = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticlesByID(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  return selectArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticleCommentsByArticleID(article_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

const postArticleCommentByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return next(err);
  }

  if (typeof body !== "string") {
    return next(err);
  }

  insertArticleCommentByArticleID(article_id, username, body)
    .then((newComment) => {
      res.status(201).send(newComment);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAPI,
  getTopics,
  getArticlesByID,
  getArticles,
  getArticleCommentsByArticleID,
  postArticleCommentByArticleID,
};
