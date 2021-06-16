import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import "./BookmarkRow.css";
import { updateLink } from "../../api";
//create clickcount

const BookmarkRow = ({ bookmark }) => {
  const {
    id,
    link_name,
    link_comment,
    link_view_count,
    link_url,
    creationdt,
    tags,
  } = bookmark;
  const [count, setCount] = useState(link_view_count);
  const increment = async () => {
    setCount(count + 1);
    try {
      await updateLink({ id, count });
    } catch (error) {
      throw error;
    }
  };
  return (
    <TableRow>
      <TableCell>
        <a
          href={link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="Link"
          onClick={increment}
        >
          {link_name}
        </a>
      </TableCell>
      <TableCell>{link_comment}</TableCell>
      <TableCell>{count}</TableCell>
      <TableCell>
        {tags.map((tag) => {
          return <p key={tag.id}>{tag.tag_content}</p>;
        })}
      </TableCell>
      <TableCell>{creationdt}</TableCell>
    </TableRow>
  );
};

export default BookmarkRow;
