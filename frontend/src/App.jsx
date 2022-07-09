import React, { useState } from "react";

import { Router, Link } from "@reach/router";
import { Box, Grommet, Heading, Text } from "grommet";
import Home from "./Home";
import Timeline from "./Timeline";
import TimelineTweet from "./TimelineTweet";
import Explore from "./Explore";
import Theme from "./components/Theme";
import { PlainLink } from "./components/Links";
import { Currency } from "grommet-icons";
import Search from "./Search";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grommet theme={Theme} full>
      <Box className="App" flex margin={{ top: "medium" }}>
        <Box width={"960px"} alignSelf={"center"} gap={"small"}>
          <Box direction={"row"} align={"center"} gap={"small"}>
            <Currency size={"large"} color={"brand"} />
            <PlainLink to={"/"}>
              <Heading level={2} margin={"none"}>
                FinDash
              </Heading>
            </PlainLink>
          </Box>
          <Box direction={"row"} gap={"small"}>
            <Link to="/">
              <Text size={"small"}>Home</Text>
            </Link>
            <Link to="timeline">
              <Text size={"small"}>Timeline</Text>
            </Link>
            <Link to="explore">
              <Text size={"small"}>Explore</Text>
            </Link>
            <Link to="search">
              <Text size={"small"}>Search</Text>
            </Link>
          </Box>
          <Box>
            <Router>
              <Home path="/" />
              <Timeline path="timeline" />
              <TimelineTweet path="timeline/:tweetId" />
              <Explore path="explore" />
              <Search path="search" />
            </Router>
          </Box>
          <Box>
            <Text size={"xsmall"} margin={{ top: "medium", bottom: "medium" }}>
              FinDash is developed by ________
            </Text>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
