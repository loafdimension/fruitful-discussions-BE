const express = require("express");
const app = express();
const db = require("../db/connection");
// controller funcs to be required in
const { getAPI } = require("./controller/controller");

app.get("/api", getAPI);

// app.get("/api/topics", getTopics);

module.exports = app;
