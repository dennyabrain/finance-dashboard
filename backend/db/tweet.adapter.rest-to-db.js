function adapterRestToSql(twitterPayload) {
  const { author, entities, context_annotations, public_metrics } =
    twitterPayload;

  const authorId = author.id;
  delete author["id"];

  const sqlPayload = {
    eTwitterId: twitterPayload.id,
    eTwitterCreatedAt: twitterPayload.created_at,
    eTwitterConversationId: twitterPayload.conversation_id,
    text: twitterPayload.text,
    lang: twitterPayload.lang,
    possiblySensitive: twitterPayload.possibly_sensitive,
    Author: {
      ...author,
      eTwitterId: authorId,
      eTwitterCreatedAt: author.created_at,
      profileImageUrl: author.profile_image_url,
    },
    PublicMetric: (() => {
      if (!public_metrics) {
        return undefined;
      } else {
        const newPublicMetrics = {
          ...public_metrics,
          retweetCount: public_metrics.retweet_count,
          replyCount: public_metrics.reply_count,
          likeCount: public_metrics.like_count,
          quoteCount: public_metrics.quote_count,
        };
        delete public_metrics.retweet_count,
          delete public_metrics.reply_count,
          delete public_metrics.like_count,
          delete public_metrics.quote_count;

        return newPublicMetrics;
      }
    })(),
  };

  if (entities) {
    sqlPayload["Entity"] = {};
    const { annotations, hashtags, mentions, urls } = entities;

    if (annotations) {
      sqlPayload["Entity"]["EntityAnnotations"] = annotations.map(
        (annotation) => {
          const newAnnotation = {
            ...annotation,
            normalizedText: annotation.normalized_text,
          };
          delete newAnnotation.normalized_text;
          return newAnnotation;
        }
      );
    }

    if (hashtags) {
      sqlPayload["Entity"]["EntityHashtags"] = hashtags.map((hashtag) => {
        return hashtag;
      });
    }

    if (mentions) {
      sqlPayload["Entity"]["EntityMentions"] = mentions.map((mention) => {
        const newMention = {
          ...mention,
          eTwitterId: mention.id,
        };
        delete newMention.id;
        return newMention;
      });
    }

    if (urls) {
      sqlPayload["Entity"]["EntityURLs"] = urls.map((url) => {
        return {
          ...url,
          expandedURL: url.expanded_url,
          displayURL: url.display_url,
          unwoundURL: url.unwound_url,
        };
      });
    }
  }

  if (context_annotations) {
    sqlPayload["ContextAnnotations"] = [];
    context_annotations.map((contextAnnotation) => {
      if (contextAnnotation.domain) {
        const newDomain = {
          ...contextAnnotation.domain,
          eId: contextAnnotation.domain.id,
        };
        delete newDomain.id;

        sqlPayload["ContextAnnotations"].push({
          ContextAnnotationDomain: newDomain,
        });
      }

      if (contextAnnotation.entity) {
        const newEntity = {
          ...contextAnnotation.entity,
          eId: contextAnnotation.entity.id,
        };
        delete newEntity.id;

        sqlPayload["ContextAnnotations"].push({
          ContextAnnotationEntity: newEntity,
        });
      }
    });
  }

  return sqlPayload;
}

module.exports = { adapterRestToSql };
