const knex = require("../db/connection");

async function list(isShowing) {
  if (isShowing) {
    return await _listActiveMovies();
  }
  return knex("movies").select("*");
}

async function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

/**
 * HELPERS
 */

function _listActiveMovies() {
  return (
    knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .select("m.*", "m.movie_id as id")
      .where({ is_showing: true })
      /**
       * duplicates removed by iterating through the array of movies,
       * checking to see if the current index has the same id as another
       * index, if it does, all those that match the condition are removed
       */
      .then((activeMovies) => {
        return activeMovies.filter((element, idx, arr) => {
          return idx === arr.findIndex((selected) => selected.id === element.id);
        });
      })
  );
}

module.exports = { list, read };
