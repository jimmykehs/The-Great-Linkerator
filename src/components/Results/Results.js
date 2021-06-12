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
  TableSortLabel,
  TableBody,
} from "@material-ui/core";

const Results = ({ searchResults }) => {
  return (
    // <div className="Results">
    //   <TableContainer component={Paper}>
    //     <table className="Results-Table">
    //       <thead>
    //         <tr className="Result-Headers">
    //           <th>Image</th>
    //           <th>Name(This will be a link)</th>
    //           <th>Comment</th>
    //           <th>Clicks</th>
    //           <th>Created On</th>
    //           <th>Tags</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {searchResults.map((bookmark) => {
    //           return <BookmarkRow key={bookmark.id} bookmark={bookmark} />;
    //         })}
    //       </tbody>
    //     </table>
    //   </TableContainer>
    // </div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Click Count</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Creation Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((bookmark) => {
            return <BookmarkRow key={bookmark.id} bookmark={bookmark} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Results;
