import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p className="footer-text">
        &copy;{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/oftheheadland"
        >
          Oftheheadland
        </a>
      </p>
      <a
        href="https://ko-fi.com/lunith"
        target="_blank"
        rel="noopener noreferrer"
        className="snapper-button donate-button"
      >
        Donate
      </a>
    </div>
  );
}

export default Footer;
