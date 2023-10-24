const PAGING_LIMIT_MAX = 100;
const paging = (req, res, next) => {
  let { page = 1, limit = PAGING_LIMIT_MAX } = req.query;

  if (limit <= 0 || limit > PAGING_LIMIT_MAX) {
    limit = PAGING_LIMIT_MAX;
  }
  page = Math.max(page, 1);
  const offset = (page - 1) * limit;
  req.query.page = page;
  req.query.limit = +limit;
  req.query.offset = offset;
  next();
};

module.exports = { paging };
