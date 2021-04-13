const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const theaters = req.params.movieId
    ? await service.list(req.params.movieId)
    : await service.list();
  res.json({ data: theaters });
}

module.exports = { list: asyncErrorBoundary(list) };
