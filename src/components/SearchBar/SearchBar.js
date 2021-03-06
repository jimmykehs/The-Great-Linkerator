import React from "react";
import "./SearchBar.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { getTags } from "../../api";

const SearchBar = ({ allBookmarks, setSearchResults, searchResults }) => {
  const [allTags, setAllTags] = useState([]);

  const [newBookmark, setnewBookmark] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    async function getAllTags() {
      const { tags } = await getTags();
      setAllTags(tags);
    }

    getAllTags();
  }, []);

  useEffect(() => {
    let results = allBookmarks.filter((result) =>
      result.link_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const addBookmark = async () => {
    try {
      const response = await fetch(`/api/links/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url, comment, tags }),
      });
      const data = await response.json();
      setnewBookmark(false);
      window.location.reload();
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
      default:
        break;
    }
  }

  function sortByTag(tagID) {
    const allResultsCopy = [...allBookmarks];
    if (tagID === -1) {
      setSearchResults(allResultsCopy);
    } else {
      const sortedArr = [];
      allResultsCopy.forEach((result) => {
        result.tags.forEach((tag) => {
          if (tag.tagId === tagID) {
            sortedArr.push(result);
          }
        });
      });
      setSearchResults(sortedArr);
    }
  }

  return (
    <>
      <div className="Search-Container">
        <TextField
          id="Search-Bar"
          label="Search for links"
          variant="outlined"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <select
          className="Sort-Select"
          onChange={(event) => {
            sortByTag(parseInt(event.target.value));
          }}
        >
          <option value="-1">Sort by Tag</option>
          {allTags.map((tag) => {
            return (
              <option key={tag.id} value={tag.id}>
                {tag.tag_content}
              </option>
            );
          })}
        </select>
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
        <div className="bookmark-forms">
          <form className="new-bookmark" onSubmit={addNewBookmark}>
            <i
              className="fa fa-times"
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
              onInput={(event) => setTags(event.target.value)}
            />
            <input
              type="text"
              placeholder="Comment"
              id="bookmark-comment"
              onInput={(event) => setComment(event.target.value)}
            />
            <button className="btn" type="submit">
              Add Bookmark
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SearchBar;
