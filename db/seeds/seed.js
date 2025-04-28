const db = require("../connection");
const format = require("pg-format");
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require("../seeds/utils");

const seed = async ({ topicData, userData, articleData, commentData }) => {
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
				slug VARCHAR PRIMARY KEY, 
				description VARCHAR, 
				img_url VARCHAR (1000)
				);`);
		})
		.then(() => {
			return db.query(`
				CREATE TABLE users (
				username VARCHAR PRIMARY KEY,
				name VARCHAR NOT NULL,
				avatar_url VARCHAR (1000)
				);`);
		})
		.then(() => {
			return db.query(`
				CREATE TABLE articles (
				article_id SERIAL PRIMARY KEY,
                title VARCHAR NOT NULL,
                topic VARCHAR NOT NULL REFERENCES topics(slug),
                author VARCHAR NOT NULL REFERENCES users(username),
                body TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                votes INT DEFAULT 0 NOT NULL,
				article_img_url VARCHAR (1000)
				);`);
		})
		.then(() => {
			return db.query(`
				CREATE TABLE comments (
				comment_id SERIAL PRIMARY KEY,
				body TEXT,
				article_id INT REFERENCES articles(article_id) NOT NULL,
				author VARCHAR REFERENCES users(username) NOT NULL,
				votes INT DEFAULT 0 NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				);`);
		})
		.then(() => {
			const insertTopicsQueryStr = format(
				"INSERT INTO topics (slug, description, img_url) VALUES %L RETURNING *;",
				topicData.map(({ slug, description, img_url }) => [
					slug,
					description,
					img_url,
				])
			);
			return db.query(insertTopicsQueryStr);
		})
		.then(() => {
			const insertUsersQueryStr = format(
				"INSERT INTO users (username, name, avatar_url) VALUES %L RETURNING *;",
				userData.map(({ username, name, avatar_url }) => [
					username,
					name,
					avatar_url,
				])
			);
			return db.query(insertUsersQueryStr);
		})
		.then(() => {
			const formattedArticlesData = articleData.map(convertTimestampToDate);
			const insertArticlesQueryStr = format(
				"INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *;",
				formattedArticlesData.map(
					({
						title,
						topic,
						author,
						body,
						created_at,
						votes = 0,
						article_img_url,
					}) => [title, topic, author, body, created_at, votes, article_img_url]
				)
			);
			return db.query(insertArticlesQueryStr);
		})
		.then(({ rows }) => {
			const articleIdLookup = createRef(rows, "title", "article_id");
			const formattedCommentData = formatComments(commentData, articleIdLookup);
			const insertCommentsQueryStr = format(
				"INSERT INTO comments (body, author, article_id, votes, created_at) VALUES %L RETURNING *;",
				formattedCommentData.map(
					({ body, author, article_id, votes = 0, created_at }) => [
						body,
						author,
						article_id,
						votes,
						created_at,
					]
				)
			);
			return db.query(insertCommentsQueryStr);
		});
};

module.exports = seed;

