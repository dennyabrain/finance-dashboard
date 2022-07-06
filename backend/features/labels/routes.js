const { StatusCodes } = require("http-status-codes");
const { getUncategorizedTweets, addLabel } = require("./controller");

async function getLabelUncategorized(req, res) {
  try {
    const tweets = await getUncategorizedTweets();
    res.json({ tweets });
  } catch (err) {
    console.log("Error : getting uncategorized tweets");
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

// /api/label/?mentionedTweetId=02323-2323-2332&label=credit card
// req.query.id);
async function postLabel(req, res) {
  const { mentionedTweetId, label } = req.body;
  try {
    await addLabel(mentionedTweetId, label);
    res.json({ msg: "Label Added" });
  } catch (err) {
    console.log("Error : adding label");
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

module.exports = (expressApp) => {
  expressApp.get("/api/label/uncategorized", getLabelUncategorized);
  expressApp.post("/api/label/", postLabel);
};
