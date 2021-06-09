import React from "react";
import "./SearchBar.css";

const SearchBar = ({ setSearchResults, searchResults }) => {
  function sortResults(sortType) {
    switch (sortType) {
      case "Increasing":
        const increasingResults = [...searchResults].sort(
          (a, b) => a.link_view_count - b.link_view_count
        );
        setSearchResults(increasingResults);
        break;
      case "Decreasing":
        const decreasingResults = [...searchResults].sort(
          (a, b) => b.link_view_count - a.link_view_count
        );
        setSearchResults(decreasingResults);
        break;
    }
  }
  return (
    <div className="Search-Container">
      <input
        className="Search-Bar"
        type="text"
        placeholder="Search sites or tags"
      />
      <select
        className="Sort-Select"
        onChange={(event) => {
          sortResults(event.target.value);
        }}
      >
        <option>Sort by link clicks</option>
        <option value="Increasing">Lowest to Highest</option>
        <option value="Decreasing">Highest to Lowest</option>
      </select>
      <button className="Add-Bookmark-Btn">Add Bookmark</button>
    </div>
  );
};

export default SearchBar;
