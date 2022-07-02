const { program } = require("commander");
const { scraper } = require("./scraper");

program
  .description("Scraper CLI for Finance Dashboard")
  .argument("<string>", "string to split")
  .requiredOption(
    "-t, --type <type>",
    "select historical or new. default is new"
  )
  .option("-s, --since <string>", "since_id of last scraped tweet")
  .action(async (arg, options) => {
    try {
      await scraper().new(options.type)();
    } catch (err) {
      console.log(err);
    }
  });

program.parse();
