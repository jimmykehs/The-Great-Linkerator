import React from "react";

import "./BookmarkRow.css";

const BookmarkRow = ({ bookmark }) => {
  const {
    link_name,
    link_comment,
    link_view_count,
    link_url,
    creationdt,
    tags,
  } = bookmark;
  return (
    <tr className="Bookmark-Row">
      <td>{bookmark.image}</td>
      <td>
        <a className="Bookmark-Link" href={link_url} target="_blank">
          {link_name}
        </a>
      </td>
      <td>{link_comment}</td>
      <td>{link_view_count}</td>
      <td>{creationdt}</td>
      <td></td>
    </tr>
  );
};

export default BookmarkRow;
