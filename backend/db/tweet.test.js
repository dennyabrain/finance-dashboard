const { save, get, getAll } = require("./tweet");
const { adapterRestToSql } = require("./tweet.adapter.rest-to-db");
const { MentionedTweet } = require("./sequelize/models");
const { TWEET_WITH_CONTEXT_ANNOTATIONS } = require("./tweet.testdata");

const TWEET = {
  created_at: "2022-07-02T15:26:30.000Z",
  entities: {
    annotations: [
      {
        start: 49,
        end: 53,
        probability: 0.7072,
        type: "Place",
        normalized_text: "India",
      },
    ],
    hashtags: [
      {
        start: 212,
        end: 232,
        tag: "stopHindiImposition",
      },
      {
        start: 234,
        end: 253,
        tag: "stophindianization",
      },
    ],
    urls: [
      {
        start: 269,
        end: 292,
        url: "https://t.co/IHNuRYe5bO",
        expanded_url:
          "https://twitter.com/nimmasanthu2/status/1543254795691397120/photo/1",
        display_url: "pic.twitter.com/IHNuRYe5bO",
        media_key: "3_1543254784907804673",
      },
    ],
    mentions: [
      {
        start: 255,
        end: 268,
        username: "bankofbaroda",
        id: "4650859756",
      },
    ],
  },
  possibly_sensitive: false,
  id: "1543254795691397120",
  public_metrics: {
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
  },
  text: "Where is Kannada words. This Karnataka not north India. Pandavapura bank of Baroda money slip no use Kannada words. Only use Hindi, English. Where Kannada. This is Kannada rural area. Pls print the Kannada slip.\n#stopHindiImposition \n#stophindianization \n@bankofbaroda https://t.co/IHNuRYe5bO",
  conversation_id: "1543254795691397120",
  lang: "en",
  author: {
    verified: false,
    protected: false,
    description: "ಭಾರತೀಯ ಕನ್ನಡಿಗ",
    username: "nimmasanthu2",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1478750535440166915/5K3gLs_E_normal.jpg",
    id: "1478750373456203776",
    name: "ಸಂತೋಷ್.ಎಂ",
    url: "",
    created_at: "2022-01-05T15:29:16.000Z",
  },
};

test("save valid tweet to db", async () => {
  const sqlpayload = adapterRestToSql(TWEET);
  const result = await save(sqlpayload);
  expect(result instanceof MentionedTweet).toBe(true);
});

/**
 * The sample tweet here contains all fields of interest to us.
 */
test("save full tweet to db", async () => {
  const sqlpayload = adapterRestToSql(TWEET_WITH_CONTEXT_ANNOTATIONS);
  const result = await save(sqlpayload);
  expect(result instanceof MentionedTweet).toBe(true);
});

test("get tweet from db", async () => {
  try {
    const result = await getAll(0, false);
    console.log("--------");
    // console.log({ RESULT: result.rows[0].toJSON() });
    console.log("--------");
    expect(result.count).toBeGreaterThan(0);
    expect(result.rows.length).toBeGreaterThan(0);
  } catch (err) {
    console.log(`Error :`);
    console.log(err);
  }
});
