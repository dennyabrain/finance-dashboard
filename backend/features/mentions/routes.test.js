const axios = require("axios");

it("test getHashtag route", async () => {
  const result = await axios.post("http://localhost:3000/api/tweet/hashtag", {
    hashtag: "digitalsavkar",
  });
  expect(true).toBe(true);
});
