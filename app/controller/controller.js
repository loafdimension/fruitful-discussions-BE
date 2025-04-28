/*
1 - RECEICVES REQUEST
2 - INVOKES MODEL
3 - SENDS BACK RESPONSE
*/

const newsData = require("../../db/data/test-data/index");
const JSONEndPoints = require("../../endpoints.json");
// model funcs to be required in

const getAPI = (req, res, next) => {
  res.status(200).send({endpoints: JSONEndPoints});
};

// controller funcs to be exported to app
module.exports = { getAPI };
