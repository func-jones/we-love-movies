const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  // if it is there AND is "true" isShowing is true. Else isShowing will be false.
  const isShowing = req.query.is_showing === "true";
  const movies = await service.list(isShowing);
  res.json({ data: movies });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

/**
 * MIDDLEWARE
 */

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
