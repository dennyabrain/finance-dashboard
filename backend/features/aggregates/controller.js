const { sequelize } = require("../../db/sequelize/models");

async function getTopHashtags(limit = 25) {
  const query = `
    SELECT DISTINCT tag,count(*) as count 
    FROM EntityHashtags 
    GROUP BY tag 
    ORDER BY count DESC LIMIT ${limit};
    `;
  const [results, metadata] = await sequelize.query(query);
  return { hashtags: results ? results : {} };
}

async function getTopMentionedAccounts(limit = 25) {
  const query = `
    SELECT distinct username,count(*) as count 
    FROM EntityMentions 
    GROUP BY username 
    ORDER BY count DESC LIMIT ${limit};
      `;

  const [results, metadata] = await sequelize.query(query);
  return { mentions: results ? results : {} };
}

async function getTopAnnotations(limit = 25) {
  const query = `
    SELECT DISTINCT normalizedText,count(*) as count 
    FROM EntityAnnotations 
    GROUP BY normalizedText 
    ORDER BY count DESC LIMIT ${limit};
    `;
  const [results, metadata] = await sequelize.query(query);
  return { annotations: results ? results : {} };
}

async function getTopURLs(limit = 25) {
  const query = `
    SELECT distinct url,count(*) as count 
    FROM EntityURLs 
    GROUP BY url 
    ORDER BY count DESC LIMIT ${limit};
    `;
  const [results, metadata] = await sequelize.query(query);
  return { urls: results ? results : {} };
}

async function getContextAnnotationEntity(limit = 25) {
  const query = `
    SELECT distinct name,count(*) as count 
    FROM ContextAnnotationEntities 
    GROUP BY name 
    ORDER BY count DESC LIMIT ${limit};
    `;
  const [results, metadata] = await sequelize.query(query);
  return { contextEntities: results ? results : {} };
}

async function getTopLanguages(limit = 25) {
  const query = `
    SELECT distinct lang,count(*) as count 
    FROM MentionedTweets 
    GROUP BY lang 
    ORDER BY count DESC LIMIT ${limit};
    `;
  const [results, metadata] = await sequelize.query(query);
  return { languages: results ? results : {} };
}

async function getLabels(limit = 10) {
  const query = `
      SELECT DISTINCT label,count(*) as count 
      FROM Labels 
      GROUP BY label;
    `;
  const [results, metadata] = await sequelize.query(query);
  return { labels: results ? results : {} };
}

async function getAllCategories(limit = 25) {
  const categories = await Promise.all([
    getTopHashtags(limit),
    getTopMentionedAccounts(limit),
    getTopAnnotations(limit),
    getTopURLs(limit),
    getContextAnnotationEntity(limit),
    getTopLanguages(limit),
    getLabels(limit),
  ]);
  return Object.assign({}, ...categories);
}

module.exports = {
  getAllCategories,
};
