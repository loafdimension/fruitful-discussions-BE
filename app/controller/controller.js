const newsData = require("../../db/data/test-data/index");
const JSONEndPoints = require("../../endpoints.json");
const {
  selectTopics,
  selectArticlesByID,
  selectArticles,
  selectArticleCommentsByArticleID,
  insertArticleCommentByArticleID,
  updateArticleVotes,
  deleteCommentByCommentID,
  selectUsers,
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
  const { sort_by, order } = req.query;

  return selectArticles(sort_by, order)
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
    return next({
      status: 400,
      msg: "400: Bad request - missing required information",
    });
  } else if (typeof body !== "string") {
    return next({
      status: 400,
      msg: "400: Invalid data type in the body",
    });
  }

  insertArticleCommentByArticleID(article_id, username, body)
    .then((newComment) => {
      res.status(201).send(newComment);
    })
    .catch((err) => {
      next(err);
    });
};

const patchUpdateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number" || inc_votes === undefined) {
    return next({
      status: 400,
      msg: "400: Bad request. inc_votes must be a number",
    });
  }

  if (isNaN(article_id)) {
    return next({
      status: 400,
      msg: "400: Invalid article ID. Please insert a number",
    });
  }

  updateArticleVotes(inc_votes, article_id)
    .then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};

const removeCommentByCommentID = (req, res, next) => {
  const { comment_id } = req.params;

  if (isNaN(comment_id)) {
    return next({
      status: 400,
      msg: "400: Invalid comment ID. Please insert a number",
    });
  }

  deleteCommentByCommentID(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  return selectUsers()
    .then((users) => {
      res.status(200).send(users);
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
  patchUpdateArticleVotes,
  removeCommentByCommentID,
  getUsers,
};
