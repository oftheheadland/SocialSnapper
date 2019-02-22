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
        href="https://ko-fi.com/E1E3LTW5"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          height="36"
          className="kofi-button"
          src="https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0"
          border="0"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </div>
  );
}

export default Footer;
