module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db/data/data.sqlite3",
  },
  test: {
    dialect: "sqlite",
    storage: "./db/data/data.sqlite3",
  },
  production: {
    dialect: "sqlite",
    storage: "/data/db.sqlite3",
  },
};
