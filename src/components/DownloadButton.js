import React from "react";

function DownloadButton(props) {
  return (
    <a
      className="snapper-button"
      target="_blank"
      rel="noopener noreferrer"
      href={props.href}
    >
      Download
    </a>
  );
}

export default DownloadButton;
