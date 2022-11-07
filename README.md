# Finance Dashboard

A public facing project to track, analyze and visualize tweets about financial companies in India

## Local Setup

### Prerequisites

1. nodejs v16.14.2
2. python 3.8.10
3. sqlite3

### Setup Database

```
cd backend
npm install
npm run db:init
```

This will create a sqlite file at `backend/db/data/data.sqlite3`

### (Optional) Enable Full Text Search in SQLite

```
sqlite3 data.sqlite3

CREATE VIRTUAL TABLE tweetText USING fts5(mentionedTweetId, text);

CREATE TRIGGER IF NOT EXISTS indexTweet AFTER INSERT ON MentionedTweets
BEGIN
INSERT INTO tweetText VALUES(new.id, new.text);
END;
```

This step is useful to be able to search through tweets from the dashboard. If you are only interested in scraping data and analysing it, you can skip this step.

### Setup Environment Variables

```
export TWITTER_API_KEY=XXXXX-BBBBBBB-XXXXXXX
export TWITTER_API_SECRET=XXXXX-YYYYYYYY-XXXXXXX
```

Contact [Denny](mailto:denny.george90@gmail.com) or [Vimal](mailto:vimsaa@gmail.com) to get these credentials.

### Scrape Data

```
node scraper-cli.js --type=historical --from=2022-01-01T00:00:00.000Z --to=2022-01-31T00:00:00.000Z
```

You can change the `from` and `to` values to incrementally scrape all historical data from twitter.
To customize the user handles scraped by the scraper, edit `backend/config.js`

### Build Web Frontend

```
cd frontend
npm run build
```

This will create a `dist` directory in frontend. Copy this to `backend/`

run `node server.js` and visit `http://localhost:3000`

## Deploying on fly.io

### App Architecture on fly.io

We deploy our app on fly.io servers.

The various components of the project are structured like this :

```
                       ┌─────────────────────┐
                       │  VOLUME             │
              ┌──────► ├─────────────────────┤
              │        │   sqlite database   │
              │        └─────────────────────┘
              │
              │
       ┌──────┴────────┐         ┌──────────────┐
       │APP            │         │APP           │
       ├───────────────┤         ├──────────────┤
       │               │         │              │
       │ REST API      │◄────────┤ CLASSIFIER   │
       │               │         │              │
   ┌──►│ FRONTEND      │         └──────────────┘
   │   │               │
   │   │ SCRAPER       │
   │   │               │
   │   │ JOBS          │
   │   │               │◄──┐
   │   └───────────────┘   │
   │      ▲       ▲        │
   │      │       │        │
   │      │       │        │
   │      │       │        │
┌──┴──┐ ┌─┴───┐ ┌─┴───┐ ┌──┴──┐
│users│ │users│ │users│ │users│
└─────┘ └─────┘ └─────┘ └─────┘
```

We have a 3GB Volume that contains all the data in a sqlite database.
An app can only be associated with one volume, hence we only run one app at a time that read/writes to the database. This is an acceptable compromise for our task. Data scraping, classification can happen periodically during down time and then the web app is available via the frontend rest of the times.

## How to Deploy

**Login to fly**
`fly auth login`

### Deploying Volume

This is a storage

**Create Volume**
`fly volumes create finance_dashboard --region maa`

maa is code for Chennai Region
default size of the newly created volume is 3 Gb. This can be increased by adding the `size` parameter.
eg : `fly volumes create myapp_data --region maa --size 40 `
This creates a 40GB storage in Madras region.

Refer to documentation [here](https://fly.io/docs/reference/volumes/) for other operations you can run on volumes on fly.io

**Using this Volume in your App**
Add the following section to your app's fly.toml

```
[mounts]
source="finance_dashboard"
destination="/data"
```

This configuration makes the volume `finance_dashboard` appear at `/data` directory of your application.
Note : If your app is started before creating the volume, your deployment will fail.

## Deploying Apps

### Node Apps

An introductory guide can be read [here](https://fly.io/docs/getting-started/node/)

To deploy your node app you need the following in your app's directory :

1. a Dockerfile
2. a fly.toml file

**Configure**
Ensure that you have a valid Dockerfile.
To generate a fly.toml file, run `fly launch`

This should generate a fly.toml file in your directory. Lets look at fields of interest

Your fly.toml file will be structured like this :

```
app = "rest_server"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = "80"

  [[services.ports]]
    handlers = ["tls", "http"]
    port = "443"

# environment
[env]
  MY_SPECIAL_ENV=some_value

[mounts]
source="finance_dashboard"
destination="/data"
```

Secrets :
You can use fly's secrets to set sensitive credentials.

```
flyctl secrets set TWITTER_API_KEY=twitter_api_key
flyctl secrets set TWITTER_API_SECRET=twitter_api_secret
```

Contact denny.george90@gmail.com or [vimsaa@gmail.com](mailto:vimsaa@gmail.com) to get these credentials.

**Deploy**
`fly deploy`

**Useful Commands for Debugging**

```
flyctl secrets list
flyctl config env
flyctl ssh console -s INSTANCE_ID
```
