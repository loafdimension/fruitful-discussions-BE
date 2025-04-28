const newsData = require("../../db/data/test-data/index");
const JSONEndPoints = require("../../endpoints.json");
// model funcs to be required in

const getAPI = (req, res, next) => {
  res.status(200).send({endpoints: JSONEndPoints});
};

//const getTopics = (req, res, next) => {

//}

module.exports = { getAPI };
