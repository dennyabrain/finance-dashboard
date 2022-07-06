const { StatusCodes } = require("http-status-codes");
const { getByLabel } = require("../labels/controller");
const {
  getByMentions,
  getByAnnotation,
  getByURL,
  getByContextAnnotationEntity,
  getByLanguage,
  getByHashtag,
} = require("./controller");

async function getHandle(req, res) {
  const { handle } = req.body;
  try {
    const tweets = await getByHandle(handle, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getHashtag(req, res) {
  const { hashtag } = req.body;
  try {
    const tweets = await getByHashtag(hashtag, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getMention(req, res) {
  const { mention } = req.body;
  try {
    const tweets = await getByMentions(mention, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getAnnotation(req, res) {
  const { annotation } = req.body;
  try {
    const tweets = await getByAnnotation(annotation, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getURL(req, res) {
  const { url } = req.body;
  try {
    const tweets = await getByURL(url, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getContextAnnotationEntity(req, res) {
  const { entity } = req.body;
  try {
    const tweets = await getByContextAnnotationEntity(entity, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getLanguage(req, res) {
  const { language } = req.body;
  try {
    const tweets = await getByLanguage(language, 1);
    res.json(tweets);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

async function getTweetByCondition(req, res) {
  let { type, value, page } = req.body;
  page = page ? page : 0;
  console.log({ type, value, page });
  try {
    let tweets = {};
    switch (type) {
      case "hashtag":
        tweets = await getByHashtag(value, page);
        break;
      case "language":
        tweets = await getByLanguage(value, page);
        break;
      case "mentions":
        tweets = await getByMentions(value, page);
        break;
      case "contextEntity":
        tweets = await getByContextAnnotationEntity(value, page);
        break;
      case "url":
        tweets = await getByURL(value, page);
        break;
      case "annotations":
        tweets = await getByAnnotation(value, page);
        break;
      case "labels":
        tweets = await getByLabel(value, page);
        break;
      default:
        tweets = {};
    }
    console.log(tweets);
    res.json(tweets);
  } catch (err) {
    console.log(`Error : fetching tweet`);
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
}

module.exports = (expressApp) => {
  expressApp.post("/api/tweet/query/", getTweetByCondition);
};
