import React from "react";
import BookmarkRow from "../BookmarkRow/BookmarkRow.js";
import "./Results.css";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const Results = ({ searchResults }) => {
  return (
    <div class="Results">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Click Count</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((bookmark) => {
              return <BookmarkRow key={bookmark.id} bookmark={bookmark} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Results;
