import React from "react";

function Footer() {
  return (
    <>
      <div className="footer-margin" />
      <div className="footer">
        <div className="footer-div">
          <p className="footer-text">
            &copy;{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/oftheheadland"
              className="footer-link"
            >
              Oftheheadland
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
