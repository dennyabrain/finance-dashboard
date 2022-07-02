const { client } = require("./client");

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
    start_time: "2021-12-31T18:30:00.000Z", // Jan 1,2022
    end_time: "2022-06-29T18:30:00.000Z", // June 30,2022
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

async function* searchAllTweetsMentioning(userHandle) {
  const { data, includes, meta } = await searchTweetsMentioning(userHandle);
  yield* data;
  let { next_token } = meta;
  while (next_token) {
    const { data, includes, meta } = await searchTweetsMentioning(
      userHandle,
      next_token
    );
    next_token = meta.next_token;
    yield* data;
  }
}

module.exports = {
  searchAllTweetsMentioning,
};
