import React from "react";

function AudioTable(props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <h3 className="youtube-title">Download Audio Only</h3>
      <table className="youtube-table">
        <thead>
          <tr>
            <th>Bit Rate</th>
            <th>Audio Codec</th>
            <th>Size</th>
            <th>
              <i className="fas fa-download large-icon" />
            </th>
          </tr>
        </thead>

        <tbody>{props.audioRows}</tbody>
      </table>
    </div>
  );
}

export default AudioTable;
