const {
  getByHandle,
  getByHashtag,
  getByMentions,
  getByAnnotation,
  getByURL,
  getByContextAnnotationEntity,
  getByLanguage,
} = require("./controller");

it("Test getting tweets by mentioned handle", async () => {
  const response = await getByHandle("canarabank", 1);
  expect(response.tweets.length).toBe(10);
});

it("Test getting tweets by hashtag", async () => {
  const response = await getByHashtag("digitalsavkar");
  expect(response.tweets.length).toBe(10);
});

it("Test getting tweets by Mentions", async () => {
  const response = await getByMentions("AmritMahotsav");
  expect(response.tweets.length).toBe(10);
});

it("Test getting tweets by Annotations", async () => {
  const response = await getByAnnotation("India");
  expect(response.tweets.length).toBe(10);
});

it("Test getting tweets by URLs", async () => {
  const response = await getByURL("https://t.co/9IyhGVm536");
  expect(response.tweets.length).toBe(10);
});

it("Test getting tweets by ContexEntityAnnotation", async () => {
  const response = await getByContextAnnotationEntity("Narendra Modi");
  expect(response.tweets.length).toBe(10);
});

it("Test getting tweets by Language", async () => {
  const response = await getByLanguage("hi");
  expect(response.tweets.length).toBe(10);
});
