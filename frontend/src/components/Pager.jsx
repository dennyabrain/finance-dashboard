import React from "react";
import { Box, Text } from "grommet";
import { LinkPrevious, LinkNext } from "grommet-icons";

const Pager = ({ page, pageCount, onNextClicked, onPreviousClicked }) => {
  return pageCount ? (
    <Box align={"center"} direction={"row"} gap={"small"}>
      <Box
        onClick={() => {
          if (page != 0) onPreviousClicked(page - 1);
        }}
        focusIndicator={false}
      >
        <LinkPrevious size={"medium"} />
      </Box>

      <Text>{`showing ${page + 1}/${pageCount}`}</Text>

      <Box
        onClick={() => {
          if (page + 1 != pageCount) onNextClicked(page + 1);
        }}
        focusIndicator={false}
      >
        <LinkNext size={"medium"} />
      </Box>
    </Box>
  ) : null;
};

export default Pager;
