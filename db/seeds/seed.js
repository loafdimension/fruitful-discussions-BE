const db = require("../connection");

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
};

module.exports = seed;
