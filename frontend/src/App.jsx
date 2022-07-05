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

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grommet theme={Theme} full>
      <Box className="App" flex margin={{ top: "medium" }}>
        <Box width={"720px"} alignSelf={"center"} gap={"small"}>
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
          </Box>
          <Box>
            <Router>
              <Home path="/" />
              <Timeline path="timeline" />
              <TimelineTweet path="timeline/:tweetId" />
              <Explore path="explore" />
            </Router>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
