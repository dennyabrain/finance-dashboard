import React from "react";
import { Box, Heading, Text } from "grommet";
import { Link } from "@reach/router";

export default function Tweet({ tweets }) {
  return (
    <Box gap={"small"}>
      {tweets.map((tweet) => (
        <Box
          round={"small"}
          border={{ color: "light-2", size: "small" }}
          pad={"medium"}
        >
          <Text size={"large"}>{tweet.text}</Text>
          {/* <Text size={"medium"} weight={"500"}>
            {tweet.authorName}
          </Text> */}
          <Text size={"medium"} weight={"500"}>
            <Link to={`/timeline/${tweet.id}`}>
              {new Date(tweet.eTwitterCreatedAt.slice(0, -7)).toDateString()}
            </Link>
          </Text>
        </Box>
      ))}
      {tweets.length === 0 ? <Text>No tweets to show</Text> : null}
    </Box>
  );
}
