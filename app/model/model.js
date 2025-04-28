const db = require("../../db/connection");

const selectTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

const selectArticlesByID = (articleID) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleID])
    .then(({ rows }) => {
      const article = rows[0];

      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "404: Error",
        });
      } else {
        return article;
      }
    });
};

const selectArticles = () => {};

module.exports = { selectTopics, selectArticlesByID, selectArticles };
