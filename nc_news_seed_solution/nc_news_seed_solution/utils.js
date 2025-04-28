const db = require("../../db/connection");

const convertTimestampToDate = ({ created_at, ...otherProperties }) => {
	if (!created_at) return { ...otherProperties };
	return { created_at: new Date(created_at), ...otherProperties };
};

const createRef = (arr, key, value) => {
	return arr.reduce((ref, element) => {
		ref[element[key]] = element[value];
		return ref;
	}, {});
};

const formatComments = (comments, idLookup) => {
	return comments.map(({ article_title, ...restOfComment }) => {
		const article_id = idLookup[article_title];
		restOfComment = convertTimestampToDate(restOfComment);
		return { article_id, ...restOfComment };
	});
};

module.exports = { formatComments, createRef, convertTimestampToDate };
