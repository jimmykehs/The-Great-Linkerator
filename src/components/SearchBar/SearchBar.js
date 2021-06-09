import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="Search-Container">
      <input
        className="Search-Bar"
        type="text"
        placeholder="Search sites or tags"
      />
      <select className="Sort-Select">
        <option value="">Sort by link visits</option>
        <option value="Increasing">Lowest to Highest</option>
        <option value="Decreasing">Highest to Lowest</option>
      </select>
      <button className="Add-Bookmark-Btn">Add Bookmark</button>
    </div>
  );
};

export default SearchBar;
