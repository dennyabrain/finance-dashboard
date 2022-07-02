function historicalDataScraper() {
  console.log(`Scraping Historical Data`);
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
          throw new Error("Unsupported scraper type");
      }
    },
  };
}

module.exports = {
  scraper,
};
