const { sequelize } = require("../../db/sequelize/models");

async function getAll(page = 0) {}

async function getById(id) {}

async function getByHandle(handle, page = 0) {
  const query = `
    SELECT
    MentionedTweets.id, MentionedTweets.eTwitterId, 
    MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
    FROM EntityMentions 
    LEFT JOIN Entities 
    ON Entities.id = EntityMentions.entityId 
    LEFT JOIN MentionedTweets 
    ON MentionedTWeets.id = Entities.mentionedTweetId 
    WHERE EntityMentions.username="${handle}" 
    LIMIT ${page * 10},10;
    `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

async function getByHashtag(hashtag, page = 0) {
  const query = `
    SELECT
    MentionedTweets.id, MentionedTweets.eTwitterId, 
    MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
    FROM EntityHashtags 
    LEFT JOIN Entities 
    ON Entities.id = EntityHashtags.entityId 
    LEFT JOIN MentionedTweets 
    ON MentionedTWeets.id = Entities.mentionedTweetId 
    WHERE EntityHashtags.tag="${hashtag}" 
    LIMIT ${page * 10},10;
  `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

async function getByMentions(mention, page = 0) {
  const query = `
  SELECT
  MentionedTweets.id, MentionedTweets.eTwitterId, 
  MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
  FROM EntityMentions 
  LEFT JOIN Entities 
  ON Entities.id = EntityMentions.entityId 
  LEFT JOIN MentionedTweets 
  ON MentionedTWeets.id = Entities.mentionedTweetId 
  WHERE EntityMentions.username="${mention}" 
  LIMIT ${page * 10},10;
  `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

async function getByAnnotation(annotation, page = 0) {
  const query = `
  SELECT
  MentionedTweets.id, MentionedTweets.eTwitterId, 
  MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
  FROM EntityAnnotations 
  LEFT JOIN Entities 
  ON Entities.id = EntityAnnotations.entityId 
  LEFT JOIN MentionedTweets 
  ON MentionedTWeets.id = Entities.mentionedTweetId 
  WHERE EntityAnnotations.normalizedText="${annotation}" 
  LIMIT ${page * 10},10;
  `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

async function getByURL(url, page = 0) {
  const query = `
  SELECT
  MentionedTweets.id, MentionedTweets.eTwitterId, 
  MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
  FROM EntityURLs 
  LEFT JOIN Entities 
  ON Entities.id = EntityURLs.entityId 
  LEFT JOIN MentionedTweets 
  ON MentionedTWeets.id = Entities.mentionedTweetId 
  WHERE EntityURLs.url="${url}" 
  LIMIT ${page * 10},10;
  `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

async function getByContextAnnotationEntity(entity, page = 0) {
  const query = `
  SELECT 
  MentionedTweets.id, MentionedTweets.eTwitterId, 
  MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
  FROM ContextAnnotationEntities 
  LEFT JOIN ContextAnnotations
  ON ContextAnnotations.id = ContextAnnotationEntities.contextAnnotationId
  LEFT JOIN MentionedTweets
  ON MentionedTweets.id = ContextAnnotations.mentionedTweetId
  WHERE ContextAnnotationEntities.name = "${entity}"
  LIMIT ${page * 10},10;
  `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

async function getByLanguage(languageCode, page = 0) {
  const query = `
  SELECT MentionedTweets.id, MentionedTweets.eTwitterId, 
  MentionedTweets.text, MentionedTweets.eTwitterCreatedAt 
  FROM MentionedTweets 
  WHERE lang="${languageCode}" 
  LIMIT ${page * 10},10;  
  `;
  const [tweets, metadata] = await sequelize.query(query);
  return { tweets };
}

module.exports = {
  getAll,
  getById,
  getByHandle,
  getByHashtag,
  getByMentions,
  getByAnnotation,
  getByURL,
  getByContextAnnotationEntity,
  getByLanguage,
};
