import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  TextInput,
  Button,
  Keyboard,
  CheckBoxGroup,
} from "grommet";
import { Search as SearchIcon } from "grommet-icons";
import axios from "axios";
import config from "../config";
import Tweet from "./components/Tweet";
import Pager from "./components/Pager";

const BANKS = [
  "bankofbaroda",
  "mahabank",
  "canarabank",
  "centralbank_in",
  "IDBI_Bank",
  "IOBIndia",
  "pnbindia",
  "TheOfficialSBI",
  "syndicatebank",
  "UCOBankOfficial",
  "AxisBankSupport",
  "HDFCBank_Cares",
  "ICICIBank",
  "KotakBankLtd",
];

const Search = () => {
  const [searchString, setSearchString] = useState(undefined);
  const [tweets, setTweets] = useState([]);
  const [bankFilter, setBankFilter] = useState([]);
  const [page, setPage] = useState(undefined);
  const [pageCount, setPageCount] = useState(undefined);

  async function onSearch() {
    console.log("search clicked", searchString);
    const response = await axios.post(`${config.API_URL}/search`, {
      query: searchString,
      filters: {
        banks: bankFilter,
      },
      page,
    });
    console.log(response);
    setTweets(response.data.tweets);
    setPageCount(response.data.pages);
  }

  useEffect(() => {
    setPage(undefined);
    onSearch();
    setPage(0);
  }, [bankFilter]);

  useEffect(() => {
    onSearch();
  }, [page]);

  return (
    <Box>
      <Keyboard onEnter={onSearch}>
        <Box direction={"row-responsive"}>
          <Box flex>
            <TextInput
              placeholder="Find tweets, hashtags about financial institutions ..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Box>
          <Button icon={<SearchIcon />} onClick={onSearch} />
        </Box>
      </Keyboard>
      <Box direction={"row-responsive"} margin={{ top: "medium" }}>
        <Box direction={"small"}>
          <Box>
            <Heading level={4} margin={{ top: "none", bottom: "small" }}>
              Banks
            </Heading>
            <CheckBoxGroup
              options={BANKS}
              value={bankFilter}
              onChange={(e) => {
                setBankFilter(e.value);
              }}
            />
          </Box>
        </Box>
        <Box gap={"small"} flex pad={{ left: "medium" }}>
          <Pager
            page={page}
            pageCount={pageCount}
            onPreviousClicked={() => setPage(page - 1)}
            onNextClicked={() => setPage(page + 1)}
          />

          <Tweet tweets={tweets} />
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
