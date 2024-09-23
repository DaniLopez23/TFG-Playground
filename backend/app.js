const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const temperatureRouter = require("./controllers/temperature");


app.use(cors());
app.use(express.json());
app.use("/sse/temperature", temperatureRouter);

module.exports = app;
