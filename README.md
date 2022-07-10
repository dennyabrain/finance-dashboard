# social-dashboard

A public facing project to track, analyze and visualize tweets about financial companies in India

## Scraper CLI

```
node scraper-cli.js --type=new --from=2021-12-31T18:30:00.000Z

node scraper-cli.js --type=historical --from=2021-12-31T18:30:00.000Z --to=2022-06-29T18:30:00.000Z
```

## Developing Locally

```
# creates all tables in sqlite database at ./backend/db/data/
npm run db:init

```

Enable Full Text Search of the tweet text

```
sqlite3 data.sqlite3

CREATE VIRTUAL TABLE tweetText USING fts5(mentionedTweetId, text);

CREATE TRIGGER IF NOT EXISTS indexTweet AFTER INSERT ON MentionedTweets
BEGIN
INSERT INTO tweetText VALUES(new.id, new.text);
END;
```

## Deploying on Fly.io

# Dates

We need to provide dates in ISO format for twitter. A handy way to generate them using node is `(new Date('Jan 1, 2022')).toISOString()`
