import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

import "./BookmarkRow.css";

const BookmarkRow = ({ bookmark }) => {
  const { link_name, link_comment, link_view_count, link_url, creationdt } =
    bookmark;

  return (
    <TableRow>
      <TableCell>{link_name}</TableCell>
      <TableCell>{link_comment}</TableCell>
      <TableCell>{link_view_count}</TableCell>
      <TableCell>tags</TableCell>
      <TableCell>{creationdt}</TableCell>
    </TableRow>
  );

  // return (
  //   <tr className="Bookmark-Row">
  //     <td>{bookmark.image}</td>
  //     <td>
  //       <a className="Bookmark-Link" href={link_url}>
  //         {link_name}
  //       </a>
  //     </td>
  //     <td>{link_comment}</td>
  //     <td>{link_view_count}</td>
  //     <td>{creationDT}</td>
  //   </tr>
  // );
};

export default BookmarkRow;
