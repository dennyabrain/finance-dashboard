const { getAllCategories } = require("./controller");

it("get aggregate values from db", async () => {
  const categories = await getAllCategories();
  expect(Object.keys(categories)).toEqual(
    expect.arrayContaining([
      "hashtags",
      "mentions",
      "annotations",
      "urls",
      "contextEntities",
      "languages",
    ])
  );
});
