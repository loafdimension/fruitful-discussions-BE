const express = require("express");
const app = express();
const db = require("../db/connection");
const { getAPI, getTopics } = require("./controller/controller");

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
       res.status(400).send({msg: "400: Bad request"}) 
    } else next(err)
})

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  });

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
