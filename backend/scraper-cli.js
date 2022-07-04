const { program } = require("commander");
const { scraper } = require("./scraper");

program
  .description("Scraper CLI for Finance Dashboard")
  .requiredOption(
    "-t, --type <type>",
    "select historical or new. default is new"
  )
  .option("-f, --from <string>", "start date in ISO format")
  .option("-t, --to <string>", "end date in ISO format")
  .action(async (arg, options) => {
    console.log(arg);
    // try {
    //   await scraper().new(options.type)();
    // } catch (err) {
    //   console.log(err);
    // }
  });

program.parse();
