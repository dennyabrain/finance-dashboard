const { searchAllTweetsMentioning } = require("./twitter/mentions");
// const { appendFile } = require("fs/promises");
const { Error } = require("./db/sequelize/models");
const { adapterRestToSql } = require("./db/tweet.adapter.rest-to-db");
const { save } = require("./db/tweet");

async function historicalDataScraper() {
  console.log(`Scraping Historical Data`);
  for await (const tweet of searchAllTweetsMentioning("bankofbaroda")) {
    try {
      const sqlpayload = adapterRestToSql(tweet);
      await save(sqlpayload);
    } catch (err) {
      console.log(`Error :  Could not save Tweet`);
      console.log(err);
      await Error.create({
        type: "CREATE_MENTIONED_TWEET",
        message: JSON.stringify(err).slice(0, 499),
      });
    }
  }
}

function newDataScraper() {
  console.log(`Scraping New Data`);
}

function scraper() {
  return {
    new(type) {
      switch (type) {
        case "historical":
          return historicalDataScraper;
        case "new":
          return newDataScraper;
        default:
          throw new Error(
            "Unsupported scraper type. Consult the REAME for scraper-cli"
          );
      }
    },
  };
}

module.exports = {
  scraper,
};
