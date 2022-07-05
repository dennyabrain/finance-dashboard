const { getAllCategories } = require("./controller");
const { UnableToGetAggregates } = require("./error");
const { StatusCodes } = require("http-status-codes");

async function getAggregate(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

module.exports = (expressApp) => {
  expressApp.get("/api/aggregate", getAggregate);
};
