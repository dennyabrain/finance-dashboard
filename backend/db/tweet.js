const {
  MentionedTweet,
  Author,
  PublicMetric,
  ContextAnnotation,
  ContextAnnotationDomain,
  ContextAnnotationEntity,
  Entity,
  EntityURL,
  EntityAnnotation,
  EntityHashtag,
  EntityMention,
} = require("./sequelize/models");

async function save(tweet) {
  return MentionedTweet.create(tweet, {
    include: [
      {
        model: Author,
      },
      {
        model: PublicMetric,
      },
      {
        model: Entity,
        include: [
          {
            model: EntityAnnotation,
          },
          {
            model: EntityHashtag,
          },
          {
            model: EntityMention,
          },
          {
            model: EntityURL,
          },
        ],
      },
      {
        model: ContextAnnotation,
        include: [
          {
            model: ContextAnnotationDomain,
          },
          {
            model: ContextAnnotationEntity,
          },
        ],
      },
    ],
  });
}

async function get(id) {}

async function getAll(pageNum, condensed = true) {
  if (condensed) {
    return MentionedTweet.findAll({ offset: pageNum * 5, limit: 10 });
  } else {
    return MentionedTweet.findAll({
      offset: pageNum * 5,
      limit: 10,

      include: { all: true, nested: true },
    });
  }
}

async function getAllByHandle(handle) {}

module.exports = {
  save,
  get,
  getAll,
  getAllByHandle,
};
