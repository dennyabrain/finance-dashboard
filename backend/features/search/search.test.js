const { search } = require("./db");

it("test search ", async () => {
  // const results = await search("fraud", ["canarabank"], 0);
  const results = await search("#sandeepbakshi", [], 0);
  expect(results.length).toBeGreaterThan(0);
});
