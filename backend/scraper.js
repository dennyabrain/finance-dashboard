const { searchAllTweetsMentioning } = require("./twitter/mentions");
// const { appendFile } = require("fs/promises");
const { Error } = require("./db/sequelize/models");
const { adapterRestToSql } = require("./db/tweet.adapter.rest-to-db");
const { save } = require("./db/tweet");
const { handles } = require("./config");

async function historicalDataScraper(arg) {
  console.log(`Scraping Historical Data`);
  for (const user of handles) {
    for await (const tweet of searchAllTweetsMentioning(user, arg)) {
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
}

function newDataScraper() {
  console.log(`Scraping New Data`);
}

function scraper() {
  return {
    new(arg) {
      switch (arg.type) {
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
