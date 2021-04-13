const knex = require("../db/connection");

function list() {
  return knex("theaters as t").select("*");
}

module.exports = { list };
