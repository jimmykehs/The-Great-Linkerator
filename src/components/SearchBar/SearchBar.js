import React from "react";
import "./SearchBar.css";
import Modal from "react-modal";
import { useState } from "react";

const SearchBar = ({ setSearchResults, searchResults }) => {
  const [newBookmark, setnewBookmark] = useState(false);
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [tag, setTag] = useState();
  const [comment, setComment] = useState();

  const addBookmark = async () => {
    try {
      const response = await fetch(`/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url, comment, tag }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Oops, could not add new bookmark, please try again");
    }
  };

  const addNewBookmark = (event) => {
    event.preventDefault();
    addBookmark();
  };

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
    <>
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
        <button
          className="Add-Bookmark-Btn"
          onClick={() => {
            setnewBookmark(true);
          }}
        >
          Add Bookmark
        </button>
      </div>

      <Modal
        style={{ opacity: 1 }}
        isOpen={newBookmark}
        onRequestClose={() => setnewBookmark(false)}
      >
        <div class="bookmark-forms">
          <form class="new-bookmark" onSubmit={addNewBookmark}>
            <i
              class="fa fa-times"
              aria-hidden="true"
              onClick={() => {
                setnewBookmark(false);
              }}
            ></i>
            <h2> New Book Mark </h2>
            <input
              type="text"
              placeholder="Name"
              id="bookmark-name"
              onInput={(event) => setName(event.target.value)}
              required
            />
            <input
              type="url"
              placeholder="https://example.com"
              id="bookmark-url"
              onInput={(event) => setUrl(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Tags"
              id="bookmark-tags"
              onInput={(event) => setTag(event.target.value)}
            />
            <input
              type="text"
              placeholder="Comment"
              id="bookmark-comment"
              onInput={(event) => setComment(event.target.value)}
            />
            <button class="btn" type="submit">
              Add Bookmark
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SearchBar;
