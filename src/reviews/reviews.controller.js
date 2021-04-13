const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const reviews = await service.list(req.params.movieId);
  res.json({ data: reviews });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
