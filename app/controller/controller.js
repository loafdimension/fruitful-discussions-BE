const newsData = require("../../db/data/test-data/index");
const JSONEndPoints = require("../../endpoints.json");
const { selectTopics } = require("../model/model");

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

module.exports = { getAPI, getTopics };
