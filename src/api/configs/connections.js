const mysqlConnection = require("../../../configs/connections");

const environment = process.env.NODE_ENV || "dev";
const config = mysqlConnection[environment];
console.log(config);
const knexContext = require("knex")(config);
module.exports = knexContext;
