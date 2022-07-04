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
npm run db:initno

```

## Deploying on Fly.io

# Dates

We need to provide dates in ISO format for twitter. A handy way to generate them using node is `(new Date('Jan 1, 2022')).toISOString()`
