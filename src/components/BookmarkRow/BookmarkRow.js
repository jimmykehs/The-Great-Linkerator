import React from "react";

const BookmarkRow = ({ bookmark }) => {
  return (
    <tr className="Bookmark-Row">
      <td>{bookmark.image}</td>
      <td>{bookmark.link_name}</td>
      <td>{bookmark.link_comment}</td>
      <td>{bookmark.link_view_count}</td>
      <td>{bookmark.creationDT}</td>
    </tr>
  );
};

export default BookmarkRow;
