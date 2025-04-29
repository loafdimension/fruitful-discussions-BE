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

const selectArticles = () => {
  return db
    .query(
      `SELECT 
  articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.body, 
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.article_id)::INT AS comment_count
FROM
  articles
LEFT JOIN
  comments ON articles.article_id = comments.article_id
GROUP BY
  articles.article_id,
  articles.title,
  articles.topic,
  articles.author,
  articles.created_at,
  articles.votes,
  articles.article_img_url
ORDER BY
  created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};

const selectArticleCommentsByArticleID = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      const comments = rows;

      if (!comments) {
        return Promise.reject({
          status: 404,
          msg: "404: Error",
        });
      } else {
        return comments;
      }
    });
};

const insertArticleCommentByArticleID = (article_id, username, body) => {
  return db.query(`INSERT INTO comments `)
};

module.exports = {
  selectTopics,
  selectArticlesByID,
  selectArticles,
  selectArticleCommentsByArticleID,
  insertArticleCommentByArticleID,
};
