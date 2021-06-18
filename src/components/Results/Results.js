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
<<<<<<< HEAD
    <TableContainer component={Paper} id="table">
      <Table>
        <TableHead id="grid">
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
=======
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
>>>>>>> b54d6f5b7380f30fbf90c12984fde2b70987a869
  );
};

export default Results;
