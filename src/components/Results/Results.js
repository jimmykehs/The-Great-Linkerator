import React, {useState} from "react";
import BookmarkRow from "../BookmarkRow/BookmarkRow.js";
import "./Results.css";
import { Paper, TableContainer } from '@material-ui/core'

const Results = () => {
  const [searchResults, setSearchResults] = useState([])

  return (
    <div className="Results">
     <TableContainer component={Paper}>
      <table className="Results-Table">
        <thead>
          <tr className="Result-Headers">
            <th>Image</th>
            <th>Name(This will be a link)</th>
            <th>Comment</th>
            <th>Clicks</th>
            <th>Created On</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((bookmark) => {
            return <BookmarkRow key={bookmark.id} bookmark={bookmark} />;
          })}
        </tbody>
      </table>
     </TableContainer>
    </div>
  );
};

export default Results;
