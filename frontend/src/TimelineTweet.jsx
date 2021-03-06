import React, { useState, useEffect } from "react";
import { useLocation } from "@reach/router";
import { Box, Heading, Text } from "grommet";
import axios from "axios";
import ReactJson from "react-json-view";
import config from "../config";

const TimelineTweet = () => {
  const [tweet, setTweet] = useState({});
  const location = useLocation();

  useEffect(async () => {
    const tweetId = location.pathname.split("/")[2];
    const res = await axios.get(`${config.API_URL}/tweets/${tweetId}`);
    console.log(res.data);
    setTweet(res.data);
  }, []);

  return (
    <div>
      <Heading level={3}>Full Tweet</Heading>
      <ReactJson src={tweet} />
    </div>
  );
};

export default TimelineTweet;
