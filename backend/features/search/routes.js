const { search } = require("./db");
const { StatusCodes } = require("http-status-codes");

async function postSearch(req, res) {
  try {
    const { query, filters, page } = req.body;
    const results = await search(query, filters.banks, page);
    res.json(results);
  } catch (err) {
    console.log(`Error Searching for tweet`);
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

module.exports = (expressApp) => {
  expressApp.post("/api/search", postSearch);
};
