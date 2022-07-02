# social-dashboard

A public facing project to track, analyze and visualize tweets about financial companies in India

## Scraper CLI

```
node scraper-cli.js --type=new
node scraper-cli.js --type=historical
```

## Developing Locally

```

# creates all tables in sqlite database at ./backend/db/data/
npm run db:initno

```

## Deploying on Fly.io

# Dates

We need to provide dates in ISO format for twitter. A handy way to generate them using node is `(new Date('Jan 1, 2022')).toISOString()`
