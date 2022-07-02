async function searchTweetsMentioning(userHandle, paginationToken) {
  const payload = {
    tweet: {
      fields: [
        "created_at",
        "entities",
        "author_id",
        "conversation_id",
        "lang",
        "public_metrics",
        "possibly_sensitive",
        "context_annotations",
      ],
    },
    expansions: "author_id",
    user: {
      fields:
        "created_at,description,id,location,name,profile_image_url,protected,url,username,verified",
    },
    max_results: 100,
    query: `@${userHandle} -is:retweet`,
    since_id: "1493278474617831425",
  };
  if (paginationToken) {
    payload.pagination_token = paginationToken;
  }
  const { data, includes, meta, errors } = await client.get(
    `tweets/search/all`,
    payload
  );

  if (errors) {
    console.log("----");
    console.log("Errors:", errors);
    throw "Could not get Mentions";
  }

  return { data, includes, meta };
}

async function* searchAllTweetsMentioning(userHandle) {
  const { data, includes, meta } = await searchTweetsMentioning(userHandle);
  yield { data, includes, meta };
  let { next_token } = meta;
  while (next_token) {
    const { data, includes, meta } = await searchTweetsMentioning(
      userHandle,
      next_token
    );
    next_token = meta.next_token;
    yield { data, includes, meta };
  }
}

module.exports = {
  searchAllTweetsMentioning,
};
