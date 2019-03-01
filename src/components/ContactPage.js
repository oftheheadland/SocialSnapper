import React from "react";
import FadeIn from "react-fade-in";

function ContactPage() {
  return (
    <FadeIn>
      <div className="outer-container">
        <p>Welcome to the contact page.</p>
        <p>
          Here there will be information about the creator and where you can
          find me and my other works
        </p>

        <p>oftheheadland.com</p>
        <p>github.com/oftheheadland</p>
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
    </FadeIn>
  );
}

export default ContactPage;
