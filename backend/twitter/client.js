const Twitter = require("twitter-v2");

module.exports = {
  client: new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
  }),
};
