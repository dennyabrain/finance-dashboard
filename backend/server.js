const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { enableFeatures } = require("./features");

app.use(cors());
app.options("*", cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

enableFeatures(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
