import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "grommet";
import axios from "axios";
import { LinkNext, LinkPrevious } from "grommet-icons";
import Tweet from "./components/Tweet";
import config from "../config";

const Explore = () => {
  const [tweets, setTweets] = useState([]);
  const [label, setLabel] = useState("");
  const [aggregate, setAggregate] = useState({
    hashtags: [],
    mentions: [],
    annotations: [],
    urls: [],
    contextEntities: [],
    languages: [],
    labels: [],
  });
  const [pgNum, setPgNum] = useState(0);
  const [currentQuery, setCurrentQuery] = useState(undefined);

  useEffect(() => {
    async function getAggregates() {
      let { data } = await axios.get(`${config.API_URL}/aggregate`);
      console.log(data);
      setAggregate(data);
    }

    getAggregates();
  }, []);

  useEffect(async () => {
    if (pgNum != 0) {
      console.log(currentQuery, pgNum);
      const response = await axios.post(`${config.API_URL}/tweet/query/`, {
        ...currentQuery,
        page: pgNum,
      });

      const fetchedTweets = response.data.tweets;
      setTweets(fetchedTweets);
    }
  }, [pgNum]);

  async function onOptionChange(type, value) {
    let fetchedTweets = [];
    setCurrentQuery({
      type,
      value,
      page: pgNum,
    });
    const response = await axios.post(`${config.API_URL}/tweet/query/`, {
      type,
      value,
    });

    fetchedTweets = response.data.tweets;

    setTweets(fetchedTweets);
    setLabel(
      `showing tweets for ${type} : ${value.label ? value.label : value}`
    );
  }

  return (
    <Box>
      {/* <Heading level={3}>Explore</Heading> */}
      <Box
        direction={"row-responsive"}
        gap={"small"}
        align={"center"}
        wrap={true}
      >
        <Text weight={600} size={"medium"}>
          Language{" "}
        </Text>
        {aggregate.languages.map((language, ix) => (
          <Box
            key={ix}
            onClick={() => onOptionChange("language", language.lang)}
          >
            <Text size={"small"}>{`${language.lang}(${language.count})`}</Text>
          </Box>
        ))}
      </Box>
      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={600} size={"medium"}>
          {" "}
          Hashtags{" "}
        </Text>
        {aggregate.hashtags.map((hashtag, ix) => (
          <Box
            width={"fit-content"}
            key={ix}
            onClick={() => onOptionChange("hashtag", hashtag.tag)}
          >
            <Text size={"small"}>{`#${hashtag.tag}(${hashtag.count})`}</Text>
          </Box>
        ))}
      </Box>
      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={600} size={"medium"}>
          {" "}
          Mentions{" "}
        </Text>
        {aggregate.mentions.map((mention, ix) => (
          <Box
            key={ix}
            onClick={() => onOptionChange("mentions", mention.username)}
          >
            <Text
              size={"small"}
            >{`${mention.username}(${mention.count})`}</Text>
          </Box>
        ))}
      </Box>

      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={600} size={"medium"}>
          {" "}
          Context Entities{" "}
        </Text>
        {aggregate.contextEntities.map((contextEntity, ix) => (
          <Box
            key={ix}
            onClick={() => onOptionChange("contextEntity", contextEntity.name)}
          >
            <Text
              size={"small"}
            >{`${contextEntity.name}(${contextEntity.count})`}</Text>
          </Box>
        ))}
      </Box>

      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={600} size={"medium"}>
          URLs{" "}
        </Text>
        {aggregate.urls.map((url, ix) => (
          <Box key={ix} onClick={() => onOptionChange("url", url.url)}>
            <Text size={"small"}>{`${url.url}(${url.count})`}</Text>
          </Box>
        ))}
      </Box>

      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={600} size={"medium"}>
          Annotations{" "}
        </Text>
        {aggregate.annotations.map((annotation, ix) => (
          <Box
            key={ix}
            onClick={() =>
              onOptionChange("annotations", annotation.normalizedText)
            }
          >
            <Text
              size={"small"}
            >{`${annotation.normalizedText}(${annotation.count})`}</Text>
          </Box>
        ))}
      </Box>

      <Box
        direction={"row-responsive"}
        gap={"small"}
        wrap={true}
        align={"center"}
      >
        <Text weight={600} size={"medium"}>
          Labels{" "}
        </Text>
        {aggregate.labels.map((label, ix) => (
          <Box key={ix} onClick={() => onOptionChange("labels", label.label)}>
            <Text size={"small"}>{`${label.label}(${label.count})`}</Text>
          </Box>
        ))}
      </Box>

      <Heading level={5} fill={true}>
        {label}
      </Heading>
      {tweets && tweets.length > 0 ? (
        <Box align={"center"} direction={"row"} gap={"small"}>
          <Box
            onClick={() => {
              if (pgNum != 0) setPgNum(pgNum - 1);
            }}
            focusIndicator={false}
          >
            <LinkPrevious size={"medium"} />
          </Box>

          <Box
            onClick={() => {
              setPgNum(pgNum + 1);
            }}
            focusIndicator={false}
          >
            <LinkNext size={"medium"} />
          </Box>
        </Box>
      ) : null}
      <Tweet tweets={tweets} />
    </Box>
  );
};

export default Explore;
