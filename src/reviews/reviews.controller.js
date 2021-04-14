const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const reviews = await service.list(req.params.movieId);
  res.json({ data: reviews });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...res.locals.updatedReview,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

/**
 * MIDDLEWARE
 */

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function hasReviewProps(req, res, next) {
  const { data } = req.body;
  if (
    (!data.content && data.score) ||
    (data.content && !data.score) ||
    (data.content && data.score)
  ) {
    res.locals.updatedReview = data;
    return next();
  }
  next({
    status: 400,
    message: `The update request must include score and/or content properties.`,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(hasReviewProps),
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
