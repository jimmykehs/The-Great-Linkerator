import React, { useState, useEffect } from "react";

import { BookmarkCard, SearchBar, Title, Results } from "./index";

import "./App.css";

const App = () => {
  const [allBookmarks, setAllBookmarks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    //fetchAllBookmarks
    //Delete fake data once API routes are up
    const testData = [
      {
        id: 1,
        link_name: "Google",
        link_url: "https://www.google.com",
        link_view_count: 0,
        link_comment: "Search Stuff",
        creationDT: "June 6, 2021 12:04AM",
      },
      {
        id: 2,
        link_name: "Twitter",
        link_url: "www.twitter.com",
        link_view_count: 10,
        link_comment: "Tweet Stuff",
        creationDT: "June 6, 2021 12:05AM",
      },
      {
        id: 3,
        link_name: "Reddit",
        link_url: "www.reddit.com",
        link_view_count: 80,
        link_comment: "Talk about anything",
        creationDT: "June 6, 2021 12:06AM",
      },
      {
        id: 4,
        link_name: "Google",
        link_url: "www.google.com",
        link_view_count: 0,
        link_comment: "Search Stuff",
        creationDT: "June 6, 2021 12:04AM",
      },
      {
        id: 5,
        link_name: "Twitter",
        link_url: "www.twitter.com",
        link_view_count: 10,
        link_comment: "Tweet Stuff",
        creationDT: "June 6, 2021 12:05AM",
      },
      {
        id: 6,
        link_name: "Reddit",
        link_url: "www.reddit.com",
        link_view_count: 80,
        link_comment: "Talk about anything",
        creationDT: "June 6, 2021 12:06AM",
      },
      {
        id: 7,
        link_name: "Google",
        link_url: "www.google.com",
        link_view_count: 0,
        link_comment: "Search Stuff",
        creationDT: "June 6, 2021 12:04AM",
      },
      {
        id: 8,
        link_name: "Twitter",
        link_url: "www.twitter.com",
        link_view_count: 10,
        link_comment: "Tweet Stuff",
        creationDT: "June 6, 2021 12:05AM",
      },
      {
        id: 9,
        link_name: "Reddit",
        link_url: "www.reddit.com",
        link_view_count: 80,
        link_comment: "Talk about anything",
        creationDT: "June 6, 2021 12:06AM",
      },
      {
        id: 10,
        link_name: "Google",
        link_url: "www.google.com",
        link_view_count: 0,
        link_comment: "Search Stuff",
        creationDT: "June 6, 2021 12:04AM",
      },
      {
        id: 11,
        link_name: "Twitter",
        link_url: "www.twitter.com",
        link_view_count: 10,
        link_comment: "Tweet Stuff",
        creationDT: "June 6, 2021 12:05AM",
      },
      {
        id: 12,
        link_name: "Reddit",
        link_url: "www.reddit.com",
        link_view_count: 80,
        link_comment: "Talk about anything",
        creationDT: "June 6, 2021 12:06AM",
      },
      {
        id: 13,
        link_name: "Google",
        link_url: "www.google.com",
        link_view_count: 0,
        link_comment: "Search Stuff",
        creationDT: "June 6, 2021 12:04AM",
      },
      {
        id: 14,
        link_name: "Twitter",
        link_url: "www.twitter.com",
        link_view_count: 10,
        link_comment: "Tweet Stuff",
        creationDT: "June 6, 2021 12:05AM",
      },
      {
        id: 15,
        link_name: "Reddit",
        link_url: "www.reddit.com",
        link_view_count: 80,
        link_comment: "Talk about anything",
        creationDT: "June 6, 2021 12:06AM",
      },
    ];

    setAllBookmarks(testData);
    setSearchResults(testData);
  }, []);

  return (
    <div className="App">
      <Title />
      <SearchBar
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
      <Results searchResults={searchResults} />
    </div>
  );
};

export default App;
