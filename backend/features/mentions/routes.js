const { StatusCodes } = require("http-status-codes");
const {
  getByMentions,
  getByAnnotation,
  getByURL,
  getByContextAnnotationEntity,
  getByLanguage,
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

module.exports = (expressApp) => {
  expressApp.post("/api/tweet/handle", getHandle);
  expressApp.post("/api/tweet/hashtag", getHashtag);
  expressApp.post("/api/tweet/mention", getMention);
  expressApp.post("/api/tweet/annotation", getAnnotation);
  expressApp.post("/api/tweet/url", getURL);
  expressApp.post(
    "/api/tweet/context-annotation-entity",
    getContextAnnotationEntity
  );
  expressApp.post("/api/tweet/language", getLanguage);
  expressApp.get("/api/tweet/by/", getTweetByCondition);
};
