import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

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
    <TableRow>
      <TableCell>
        <a href={link_url} target="_blank" className="Link">
          {link_name}
        </a>
      </TableCell>
      <TableCell>{link_comment}</TableCell>
      <TableCell>{link_view_count}</TableCell>
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
