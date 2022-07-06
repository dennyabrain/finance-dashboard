const { addLabel, getByLabel } = require("./controller");

it("test adding label", async () => {
  await addLabel("00118963-8b2a-4c6c-80da-a522191bd0c9", "UNCATEGORIZED");
});

it("get tweet by label", async () => {
  const result = await getByLabel("credit card");
  console.log(result);
});
