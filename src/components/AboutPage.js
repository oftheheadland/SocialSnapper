import React from "react";
import FadeIn from "react-fade-in";

function AboutPage() {
  return (
    <FadeIn>
      <div className="about-container">
        <h1>About</h1>
        <hr />
        <h3>How do I use it?</h3>
        <p>Reddit</p>
        <p className="url-tip">
          Your URL should look like this:{" "}
          <a
            href="https://www.reddit.com/r/aww/comments/arz9u2/happy_baby_donkey/"
            style={{ color: "rgb(228, 55, 37)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.reddit.com/r/aww/comments/arz9u2/happy_baby_donkey/
          </a>
        </p>
        <p className="url-tip">
          Or this:{" "}
          <a
            href="https://v.redd.it/ue83vad6ych21"
            style={{ color: "rgb(228, 55, 37)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://v.redd.it/ue83vad6ych21
          </a>
        </p>

        <p>Instagram</p>
        <p>
          <p className="url-tip">
            Instagram Post or Album:{" "}
            <a
              href="https://www.instagram.com/p/Bs8qUvrhYBj/"
              style={{ color: "rgb(228, 55, 37)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com/p/Bs8qUvrhYBj/
            </a>
          </p>
          <p className="url-tip">
            Instagram Highlights:{" "}
            <a
              href="https://www.instagram.com/stories/highlights/17871290047271382/"
              style={{ color: "rgb(228, 55, 37)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com/stories/highlights/17871290047271382/
            </a>
          </p>
          <p className="url-tip">
            Instagram Stories:{" "}
            <a
              href="https://www.instagram.com/stories/instagram/"
              style={{ color: "rgb(228, 55, 37)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com/stories/instagram/
            </a>
          </p>
          <p className="url-tip">
            Instagram Profile Picture:{" "}
            <a
              href="https://www.instagram.com/instagram/"
              style={{ color: "rgb(228, 55, 37)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.instagram.com/instagram/
            </a>
          </p>
        </p>
        <h3>Why?</h3>
        <p>
          SocialSnapper is an answer to some of the problems we face as users of
          the modern internet.
        </p>
        <p>
          In an age where censorship is rampant and archival is an afterthought,
          we depend on downloading and storing media ourselves to preserve it.
        </p>
        <p>
          Through a variety of tricks by the very tech companies that allow
          content to be hosted and shared, they have made it increasingly
          difficult to download their media.
        </p>
        <p>
          The goal of this project is to give that power back to users. Here you
          can download images and videos that are locked behind gate and key.
        </p>
        <p>
          Similar websites exist and are, for the most part, pretty good. But
          those similar websites are often riddled with advertisements,
          paywalls, and watermarks.
        </p>
        <p>
          SocialSnapper gathers multiple services into one place so you're not
          constantly searching everytime you need to download a video.
        </p>
        <p>
          SocialSnapper has none of those invasions of privacy. We are
          transparent and open to suggestions. If you have ideas on how to
          improve SocialSnapper please check out our contact page.
        </p>

        <p>
          Here there will be explanation of what the app does, how it was built,
          how it works, and some examples of its functions.
        </p>

        <h3>How does it work?</h3>
        <p>
          SocialSnapper began as an opportunity to learn{" "}
          <a href="https://reactjs.org/" rel="n">
            React.js
          </a>
          .
        </p>
      </div>
    </FadeIn>
  );
}

export default AboutPage;
