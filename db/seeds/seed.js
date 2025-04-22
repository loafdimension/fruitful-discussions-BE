const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate } = require("../seeds/utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE topics (
    slug VARCHAR(1000) NOT NULL PRIMARY KEY,
    description VARCHAR(1000),
    img_url VARCHAR(1000));
    `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
        username VARCHAR(1000) NOT NULL PRIMARY KEY,
        name VARCHAR(1000) NOT NULL,
        avatar_url VARCHAR(1000) NOT NULL);
        `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles (
        article_ID SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        topic VARCHAR(1000) NOT NULL REFERENCES topics(slug),
        author VARCHAR(1000) NOT NULL REFERENCES users(username),
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000) NOT NULL);
        `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments (
        comment_ID SERIAL PRIMARY KEY,
        article_ID INT REFERENCES articles(article_ID),
        body TEXT,
        votes INT DEFAULT 0,
        author VARCHAR (100) NOT NULL REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
        `);
    })
    .then(() => {
      // get data in to nested arrays
      const nestedArrayTopicsData = topicData.map(
        ({ slug, description, img_url }) => {
          return [slug, description, img_url];
        }
      );
      // use pg format to insert in to the table
      const pgFormattedTopicsData = format(
        `
        INSERT INTO topics
        (slug, description, img_url)
        VALUES
        %L
        RETURNING *`,
        nestedArrayTopicsData
      );
      // make the query
      return db.query(pgFormattedTopicsData);
    })
    .then(() => {
      // get data in to nested arrays
      const nestedArrayUsersData = userData.map(
        ({ username, name, avatar_url }) => {
          return [username, name, avatar_url];
        }
      );
      // use pg format to insert in to the table
      const pgFormattedUsersData = format(
        `
        INSERT INTO users
        (username, name, avatar_url)
        VALUES
        %L
        RETURNING *
        `,
        nestedArrayUsersData
      );
      // make the query
      return db.query(pgFormattedUsersData);
    })
    .then(() => {
      // get data in to nested arrays
      const nestedArrayArticlesData = articleData.map((article) => {
        const {
          title,
          topic,
          author,
          body,
          created_at,
          votes,
          article_img_url,
        } = convertTimestampToDate(article);

        return [title, topic, author, body, created_at, votes, article_img_url];
      });
      // use pg format to insert in to the table
      const pgFormattedArticlesData = format(
        `
        INSERT INTO articles
        (title, topic, author, body, created_at, votes, article_img_url)
        VALUES
        %L
        RETURNING *
        `,
        nestedArrayArticlesData
      );
      // make the query
      return db.query(pgFormattedArticlesData);
    })
    .then((result) => {
      console.log(result)
      // invoke new func 
      // get data in to nested arrays
      const nestedArrayCommentsData = commentData.map((comment) => {
        const { article_id, body, votes, author, created_at } =
          convertTimestampToDate(comment);
        console.log(article_id, "<<< article id")
        return [article_id, body, votes, author, created_at];
      });
      // use pg format to insert in to the table
      const pgFormattedCommentsData = format(
        `
        INSERT INTO comments
        (article_id, body, votes, author, created_at)
        VALUES
        %L
        RETURNING *
        `,
        nestedArrayCommentsData
      );
      // make the queryreccomend
      return db.query(pgFormattedCommentsData);
    });
};

module.exports = seed;

// ARTICLES AND COMMENTS ARE EMPTY
// UTILITY FUNCTION NEEDS TO BE CREATED TO SORT THIS?

// look up object
