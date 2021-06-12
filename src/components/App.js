import React, { useState, useEffect } from "react";

import { SearchBar, Title, Results } from "./index";
import { getLinks } from "../api";

import "./App.css";

const App = () => {
  const [allBookmarks, setAllBookmarks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      const { links } = await getLinks();
      console.log(links);
      setAllBookmarks(links);
      setSearchResults(links);
    }

    fetchBookmarks();
  }, []);

  return (
    <div className="App">
      <Title />
      <SearchBar
        allBookmarks={allBookmarks}
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />

      <Results searchResults={searchResults} />
    </div>
  );
};

export default App;
