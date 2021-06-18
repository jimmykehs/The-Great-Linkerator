import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Delete as DeleteIcon } from '@material-ui/icons';
import "./BookmarkRow.css";
import { updateLink, deleteLink } from "../../api";


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


  const onDelete = (id) => {
    deleteLink(id)
    window.location.reload();
  }

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
      <TableCell align="left">
        <DeleteIcon
          className="Trash"
          onClick={() => {
            onDelete(id);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default BookmarkRow;
