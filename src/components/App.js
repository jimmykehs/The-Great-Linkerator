import React, { useState, useEffect } from "react";

import { BookmarkCard, SearchBar, Title, Results } from "./index";
import { getLinks } from "../api";

import "./App.css";

const App = () => {
  const [allBookmarks, setAllBookmarks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      const allLinks = await getLinks();
      console.log(allLinks);
      setAllBookmarks(allLinks);
      setSearchResults(allLinks);
    }

    fetchBookmarks();
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
