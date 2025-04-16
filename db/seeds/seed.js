const db = require("../connection");
const format = require("pg-format");
const {convertTimestampToDate} = require("../seeds/utils");

/*
create tables for topics / users / articles / comments

TOPICS
slug - unique primary key
description - string (varchar)
image_url - string containing link to image url (varchar)

USERS
username - unique primary key
name - varchar
avatar_url - varchar

ARTICLES
article_ID - unique primary key
title - varchar
topic - references slug from the topics table
author - referencey username from users
body - varchar
created_at - defaults to current timestamp
votes - deafults to 0
article_image_url - string

COMMENTS
comment_ID - unique primary key
article_ID - references article_ID from articles
body - string
votes - defaults to 0
author - references username from users
created_at - defaults to current timestamp
*/

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
    // .then((result) => {
    //   // convert timestamp to compatible format (ish)
    //   const articlesWithDates = articleData.map(convertTimestampToDate);

    //   // get data in to nested arrays
    //   const nestedArrayArticlesData = articleData.map(
    //     ({
    //       title,
    //       topic,
    //       author,
    //       body,
    //       created_at,
    //       votes,
    //       article_img_url,
    //     }) => {
    //       // converting date to compatible format (again)
    //       // const formattedDate;
    //       return [
    //         title,
    //         topic,
    //         author,
    //         body,
    //         created_at,
    //         votes,
    //         article_img_url,
    //       ];
    //     }
    //   );
    //   // use pg format to insert in to the table
    //   const pgFormattedArticlesData = format(
    //     `
    //     INSERT INTO articles
    //     (title, topic, author, body, created_at, votes, article_img_url)
    //     VALUES
    //     %L
    //     RETURNING *
    //     `,
    //     nestedArrayArticlesData
    //   );
    //   // make the query
    //   return db.query(pgFormattedArticlesData);
    // })
};

module.exports = seed;
