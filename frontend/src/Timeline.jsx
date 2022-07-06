import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "grommet";
import { LinkNext, LinkPrevious } from "grommet-icons";

import axios from "axios";
import { Link } from "@reach/router";
import { PlainLink } from "./components/Links";
import config from "../config";

const Timeline = () => {
  const [tweets, setTweets] = useState([]);
  const [pgNum, setPgNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(async () => {
    const response = await axios.get(`${config.API_URL}/tweets/page/${pgNum}`);

    console.log(response);
    setTotalPages(response.data.count / 5);
    setTweets(response.data.tweets);
  }, [pgNum]);

  return (
    <Box>
      {/* <Heading level={3}>Timeline</Heading> */}
      <Box align={"center"} direction={"row"} gap={"small"}>
        <Box
          onClick={() => {
            if (pgNum != 0) setPgNum(pgNum - 1);
          }}
          focusIndicator={false}
        >
          <LinkPrevious size={"medium"} />
        </Box>
        <Heading level={5}>
          {" "}
          {`showing ${pgNum + 1} of ${totalPages} pages`}
        </Heading>
        <Box
          onClick={() => {
            if (pgNum != totalPages) setPgNum(pgNum + 1);
          }}
          focusIndicator={false}
        >
          <LinkNext size={"medium"} />
        </Box>
      </Box>
      <Box gap={"small"}>
        {tweets.map((tweet) => (
          <Box
            round={"small"}
            border={{ color: "light-2", size: "small" }}
            pad={"medium"}
            gap={"medium"}
          >
            <Text size={"large"}>{tweet.text}</Text>
            <Box direction={"row-responsive"} gap={"small"}>
              <Text size={"medium"} weight={"300"}>
                {tweet.authorName}
              </Text>
              <Text size={"medium"} weight={"300"}>
                <PlainLink to={`${tweet.id}`}>
                  {new Date(
                    tweet.eTwitterCreatedAt.slice(0, -7)
                  ).toDateString()}
                </PlainLink>
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Timeline;
