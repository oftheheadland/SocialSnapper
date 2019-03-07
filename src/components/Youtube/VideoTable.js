import React from "react";

function VideoTable(props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <h3 className="youtube-title">Download Video Only</h3>
      <table className="youtube-table">
        <thead>
          <tr>
            <th>Quality</th>
            <th>Type</th>
            <th>Size</th>
            <th>
              <i className="fas fa-download large-icon" />
            </th>
          </tr>
        </thead>

        <tbody>{props.videoRows}</tbody>
      </table>
    </div>
  );
}

export default VideoTable;
