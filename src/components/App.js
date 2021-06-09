import React, { useState, useEffect } from "react";

import { BookmarkCard, SearchBar } from "./index";

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
        name: "Google",
        url: "www.google.com",
        clickCount: 0,
      },
      {
        id: 2,
        name: "Youtube",
        url: "www.youtube.com",
        clickCount: 0,
      },
      {
        id: 3,
        name: "Twitter",
        url: "www.twitter.com",
        clickCount: 0,
      },
    ];

    setAllBookmarks(testData);
    setSearchResults(testData);
  }, []);

  return (
    <div className="App">
      <SearchBar setSearchResults={setSearchResults} />

      <div className="Search-Results">
        {searchResults.map((bookmark) => {
          return <BookmarkCard key={bookmark.id} bookmark={bookmark} />;
        })}
      </div>
    </div>
  );
};

export default App;
