import React from "react";
import FadeIn from "react-fade-in";

function ContactPage() {
  return (
    <FadeIn>
      <div className="about-container">
        <h1>Contact Me</h1>
        <hr />

        <p>
          <a
            href="mailto:socialsnapperdev@gmail.com"
            className="snapper-link"
            target="_top"
          >
            Email me
          </a>{" "}
          ideas, bugs, and feature requests.
        </p>
        <p>
          <a
            href="http://github.com/oftheheadland"
            className="snapper-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          where you can see my other projects.
        </p>
        <p>
          <a
            href="https://discord.gg/dVcxkSM"
            className="snapper-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord Server
          </a>{" "}
          where you can request features and changes to the developer directly.
        </p>
        <a
          href="https://ko-fi.com/E1E3LTW5"
          className="snapper-link"
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
    </FadeIn>
  );
}

export default ContactPage;
