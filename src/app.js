if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const theatersRouter = require("./theaters/theaters.router");

module.exports = app;
