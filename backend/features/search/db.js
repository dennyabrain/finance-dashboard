const { sequelize } = require("../../db/sequelize/models");

async function searchText(searchTerm, bankFilters, page = 0) {
  bankFilterQuery =
    bankFilters.length === 0
      ? ""
      : `AND EntityMentions.username IN ("${bankFilters.join('","')}")`;
  const query = `
    SELECT
    MentionedTweets.id, MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
    FROM EntityMentions 
    LEFT JOIN Entities 
    ON Entities.id = EntityMentions.entityId 
    LEFT JOIN MentionedTweets 
    ON MentionedTweets.id = Entities.mentionedTweetId 
    WHERE MentionedTweets.id 
    IN (SELECT mentionedTweetId FROM tweetText 
        WHERE text MATCH "${searchTerm}" ORDER BY rank) 
    ${bankFilterQuery}
    LIMIT ${page * 10},10;
    `;
  const countQuery = `
    SELECT
    COUNT(*) as count
    FROM EntityMentions 
    LEFT JOIN Entities 
    ON Entities.id = EntityMentions.entityId 
    LEFT JOIN MentionedTweets 
    ON MentionedTweets.id = Entities.mentionedTweetId 
    WHERE MentionedTweets.id 
    IN (SELECT mentionedTweetId FROM tweetText 
        WHERE text MATCH "${searchTerm}" ORDER BY rank) 
    ${bankFilterQuery}`;

  const [[tweets, metadata], [count, countMetadata]] = await Promise.all([
    sequelize.query(query),
    sequelize.query(countQuery),
  ]);
  return {
    tweets,
    count: count[0].count,
    pages: Math.ceil(count[0].count / 10),
  };
}

async function searchHashtag(searchTerm, bankFilters, page = 0) {
  bankFilterQuery =
    bankFilters.length === 0
      ? ""
      : `AND EntityMentions.username IN ("${bankFilters.join('","')}")`;
  const query = `
    SELECT
    MentionedTweets.id, MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
    FROM EntityHashtags 
    LEFT JOIN Entities 
    ON Entities.id = EntityHashtags.entityId 
    LEFT JOIN EntityMentions 
    ON Entities.id = EntityMentions.entityId
    LEFT JOIN MentionedTweets 
    ON MentionedTweets.id = Entities.mentionedTweetId 
    WHERE EntityHashtags.tag="${searchTerm}" ${bankFilterQuery}
    LIMIT ${page * 10},10;
    `;
  const countQuery = `
    SELECT
    COUNT(*) as count
    FROM EntityHashtags 
    LEFT JOIN Entities 
    ON Entities.id = EntityHashtags.entityId 
    LEFT JOIN EntityMentions 
    ON Entities.id = EntityMentions.entityId
    LEFT JOIN MentionedTweets 
    ON MentionedTweets.id = Entities.mentionedTweetId 
    WHERE EntityHashtags.tag="${searchTerm}" ${bankFilterQuery}
    LIMIT ${page * 10},10`;

  const [[tweets, metadata], [count, countMetadata]] = await Promise.all([
    sequelize.query(query),
    sequelize.query(countQuery),
  ]);
  return {
    tweets,
    count: count[0].count,
    pages: Math.ceil(count[0].count / 10),
  };
}

async function search(searchTerm, ...args) {
  let searchFunc;
  if (searchTerm.startsWith("#")) {
    let strippedSearchTerm = searchTerm.slice(1);
    searchFunc = searchHashtag(strippedSearchTerm, ...args);
  } else {
    searchFunc = searchText(searchTerm, ...args);
  }
  return searchFunc;
}

module.exports = {
  search,
};
