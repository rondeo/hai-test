const express = require("express");
const api = express.Router();
const authenticateRouter = require('./authenticate.routes');

const allowe = require('../middleware/allowe-origin');

api.use(allowe);
api.use("/accounts", authenticateRouter);

module.exports = api;
