async function getAll(page = 0) {}

async function getById(id) {}

async function getByHandle(handle, page = 0) {
  const query = `
    SELECT
    EntityMentions.entityId,
    EntityMentions.username, Entities.mentionedTweetId,
    MentionedTweets.text, MentionedTweets.eTwitterCreatedAt
    FROM EntityMentions 
    LEFT JOIN Entities 
    ON Entities.id = EntityMentions.entityId 
    LEFT JOIN MentionedTweets 
    ON MentionedTWeets.id = Entities.mentionedTweetId 
    WHERE EntityMentions.username="canarabank" 
    LIMIT 0,10;
    `;
}

async function getByHashtag(hashtag, page = 0) {}

async function getByMentions(mention, page = 0) {}

async function getByAnnotation(annotation, page = 0) {}

async function getByContextAnnotationEntity(entiy, page = 0) {}

async function getByLanguage(languageCode, page = 0) {}

async function getByLabel(label, page = 0) {}
