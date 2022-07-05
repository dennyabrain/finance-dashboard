import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "grommet";
import axios from "axios";
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
  });

  useEffect(() => {
    async function getAggregates() {
      let { data } = await axios.get(`${config.API_URL}/aggregate`);
      console.log(data);
      setAggregate(data);
    }

    getAggregates();
  }, []);

  async function onOptionChange(type, value) {
    console.log({ type, value });
    let fetchedTweets = [];
    switch (type) {
      case "language":
        const resL = await axios.get("http://localhost:3000/tweets/query", {
          params: {
            type,
            value: value.code,
            pg: 0,
          },
        });
        fetchedTweets = resL.data.tweets;
        // console.log(res.data);
        break;
      case "entity":
        const resE = await axios.get("http://localhost:3000/tweets/query", {
          params: {
            type,
            value: value,
            pg: 0,
          },
        });
        console.log(resE);
        fetchedTweets = resE.data.tweets;
        break;
      case "hashtag":
        const resF = await axios.get("http://localhost:3000/tweets/query", {
          params: {
            type,
            value: value,
            pg: 0,
          },
        });
        fetchedTweets = resF.data.tweets;
        break;
      default:
        break;
    }
    setTweets(fetchedTweets);
    setLabel(
      `showing tweets for ${type} : ${value.label ? value.label : value}`
    );
  }

  return (
    <Box>
      {/* <Heading level={3}>Explore</Heading> */}
      <Box direction={"row-responsive"} gap={"small"} align={"center"}>
        <Text weight={600} size={"medium"}>
          Language{" "}
        </Text>
        {aggregate.languages.map((language, ix) => (
          <Box
            key={ix}
            onClick={() => onOptionChange("language", language)}
            direction={"row"}
            width={"fit-content"}
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
            onClick={() => onOptionChange("hashtag", hashtag)}
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
          <Box key={ix} onClick={() => onOptionChange("mention", mention)}>
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
            onClick={() => onOptionChange("contextEntity", contextEntity)}
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
          <Box key={ix} onClick={() => onOptionChange("url", url)}>
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
            onClick={() => onOptionChange("annotations", annotation.type)}
          >
            <Text
              size={"small"}
            >{`${annotation.type}(${annotation.count})`}</Text>
          </Box>
        ))}
      </Box>

      <Heading level={5} fill={true}>
        {label}
      </Heading>
      <Tweet tweets={tweets} />
    </Box>
  );
};

export default Explore;
