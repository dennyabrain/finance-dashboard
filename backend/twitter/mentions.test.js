const { searchAllTweetsMentioning } = require("./mentions");
const { adapterRestToSql } = require("../db/tweet.adapter.rest-to-db");

it("get tweets from search archive", async () => {
  let i = 0;
  for await (const tweet of searchAllTweetsMentioning("bankofbaroda")) {
    const sqlpayload = adapterRestToSql(tweet);
    i++;
  }
  console.log({ TOTAL: i });
  expect(true).toBe(true);
});
