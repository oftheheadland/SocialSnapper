import React from "react";

function BothTable(props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <h3 className="youtube-title">Download Video With Audio</h3>
      <table className="youtube-table">
        <thead>
          <tr>
            <th>Quality</th>
            <th>Type</th>
            <th>Audio Codec</th>
            <th>Size</th>
            <th><i className="fas fa-download large-icon" /></th>
          </tr>
        </thead>

        <tbody>{props.bothRows}</tbody>
      </table>
    </div>
  );
}

export default BothTable;
