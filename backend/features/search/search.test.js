const { search } = require("./db");

it("test search ", async () => {
  const results = await search("password", ["canarabank", "pnbindia"], 0);
  console.log(results);
});
