const TWEET_WITH_CONTEXT_ANNOTATIONS = {
  created_at: "2022-07-02T15:12:01.000Z",
  possibly_sensitive: false,
  context_annotations: [
    {
      domain: {
        id: "88",
        name: "Political Body",
        description: "A section of a government, like The Supreme Court",
      },
      entity: { id: "1137025566706561027", name: "PMO India" },
    },
    {
      domain: {
        id: "10",
        name: "Person",
        description: "Named people in the world like Nelson Mandela",
      },
      entity: {
        id: "806566669166350336",
        name: "Narendra Modi",
        description: "Prime Minister of India Narendra Modi",
      },
    },
    {
      domain: {
        id: "35",
        name: "Politician",
        description: "Politicians in the world, like Joe Biden",
      },
      entity: {
        id: "806566669166350336",
        name: "Narendra Modi",
        description: "Prime Minister of India Narendra Modi",
      },
    },
  ],
  id: "1543251151490953216",
  public_metrics: {
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
  },
  text: "@bankofbaroda @BankofBarodaCEO @PMOIndia @narendramodi sirf bate karte h but yaha btate kuch nhi h maine pucha ki kcc ho raha h ki nhi to enko ye batane me saram aati h",
  entities: {
    mentions: [
      { start: 0, end: 13, username: "bankofbaroda", id: "4650859756" },
      { start: 14, end: 30, username: "BankofBarodaCEO", id: "3849579859" },
      { start: 31, end: 40, username: "PMOIndia", id: "471741741" },
      { start: 41, end: 54, username: "narendramodi", id: "18839785" },
    ],
  },
  conversation_id: "1543250446977884160",
  lang: "hi",
  author: {
    verified: false,
    protected: false,
    description: "Saffron tiger ( कट्टर हिन्दू फॉलो करें जय श्री राम)",
    username: "saffron_Tiger_",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1481125824623681539/x-pLlPwa_normal.jpg",
    id: "1481123090218516481",
    name: "saffron Tiger",
    url: "",
    created_at: "2022-01-12T04:38:20.000Z",
  },
};

module.exports = {
  TWEET_WITH_CONTEXT_ANNOTATIONS,
};
