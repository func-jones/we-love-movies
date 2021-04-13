const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const theaters = await service.list();
  res.json({ data: theaters });
}
module.exports = { list: asyncErrorBoundary(list) };
