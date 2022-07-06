const { sequelize, Label } = require("../../db/sequelize/models");

async function addLabel(mentionedTweetId, label) {
  await Label.create({
    mentionedTweetId,
    label,
  });
}

/**
 *
 */
async function getUncategorizedTweets() {
  const [tweets, metadata] = await sequelize.query(`
        SELECT MentionedTweets.id, MentionedTweets.text 
        FROM MentionedTweets 
        LEFT JOIN Labels ON MentionedTweets.id = Labels.mentionedTweetId 
        WHERE (Labels.label is NULL AND MentionedTweets.lang=='en') 
        LIMIT 0,5 ;
    `);
  return tweets;
}

async function getByLabel(label, page = 0) {
  const [tweets, metadata] = await sequelize.query(
    `
    SELECT MentionedTweets.id, MentionedTweets.text, MentionedTweets.eTwitterCreatedAt 
    FROM MentionedTweets 
    LEFT JOIN Labels 
    ON MentionedTweets.id = Labels.mentionedTweetId 
    WHERE Labels.label = '${label}'
    LIMIT ${page * 10},10 ;
    `
  );
  return { tweets };
}

module.exports = { addLabel, getUncategorizedTweets, getByLabel };
