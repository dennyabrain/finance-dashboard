const { client } = require("./client");

async function searchTweetsMentioning(userHandle, arg, paginationToken) {
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
    start_time: arg.from,
    end_time: arg.to,
  };
  if (paginationToken) {
    payload.pagination_token = paginationToken;
  }
  const { data, includes, meta, errors } = await client.get(
    `tweets/search/all`,
    payload
  );

  if (errors) {
    console.log("Errors:", errors);
    throw new Error("Could not get Mentions");
  }

  const usersById = {};

  includes.users.map((user) => {
    usersById[user.id] = user;
  });

  data.map((datum, ix) => {
    if (datum.author_id) {
      if (usersById[datum.author_id]) {
        data[ix].author = usersById[datum.author_id];
        delete data[ix].author_id;
      }
    }
  });

  return { data, includes, meta };
}

async function* searchAllTweetsMentioning(userHandle, arg) {
  const { data, includes, meta } = await searchTweetsMentioning(
    userHandle,
    arg
  );
  yield* data;
  let { next_token } = meta;
  while (next_token) {
    const { data, includes, meta } = await searchTweetsMentioning(
      userHandle,
      arg,
      next_token
    );
    next_token = meta.next_token;
    yield* data;
  }
}

module.exports = {
  searchAllTweetsMentioning,
};
