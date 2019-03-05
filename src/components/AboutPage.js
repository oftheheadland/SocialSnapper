import React from "react";
import FadeIn from "react-fade-in";

function AboutPage() {
  return (
    <FadeIn>
      <div className="about-container">
        <h1>About</h1>
        <hr />
        <div className="about-div">
          <h3>
            <i className="fas fa-caret-right" /> How do I use it?
          </h3>
          <p>
            Copy the link from your browser's address bar of the content you
            would like to save.
          </p>
          <p>
            Paste the entire link into SocialSnapper under the relevant tab.
          </p>
          <p>See examples below.</p>
          <div>
            <ul>
              <li>
                <h4>Reddit</h4>
                <p className="url-tip">
                  Example Reddit post containing a v.redd.it video:{" "}
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
                  Shortened URL versions also work:{" "}
                  <a
                    href="https://v.redd.it/ue83vad6ych21"
                    style={{ color: "rgb(228, 55, 37)" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://v.redd.it/ue83vad6ych21
                  </a>
                </p>
              </li>
              {/* <p className="url-tip">
          Note: this will not work on just any Reddit video post. Reddit posts
          come in all shapes and sizes including Gyfcat, Imgur, Streamable,
          YouTube, and more.
        </p>

        <p className="url-tip">
          Luckily, most of those websites are easy to download content from, so
          there is no need to fret. And if it's a YouTube video you can check
          out the YouTube tab.
        </p>

        <p className="url-tip">
          Reddit converts some video submissions to its propietary format, which
          SocialSnapper helps you get around. It is only intended to be used on
          v.redd.it videos.
        </p> */}
              <p className="url-tip">
                This is only intended to be used on posts with v.redd.it videos.
              </p>
              <li>
                <h4>Instagram</h4>
                <p className="url-tip">
                  Instagram Posts and Albums:{" "}
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
              </li>
              <li>
                <h4>YouTube</h4>
                <p className="url-tip">
                  Any YouTube Video will work. Playlists are not currently
                  supported but we have plans for it.
                </p>
                <p className="url-tip">
                  Example:{" "}
                  <a
                    href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
                    style={{ color: "rgb(228, 55, 37)" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.youtube.com/watch?v=a3lcGnMhvsA
                  </a>
                </p>
              </li>
              <li>
                <h4>Twitch</h4>
                <p className="url-tip">
                  Any Twitch.tv Clip with the exception of banned or deleted
                  clips. Videos and streams are not supported.
                </p>
                <p className="url-tip">
                  Example:{" "}
                  <a
                    href="https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy"
                    style={{ color: "rgb(228, 55, 37)" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="about-div">
          <h3>
            <i className="fas fa-caret-right" /> Why?
          </h3>
          <p>
            SocialSnapper is an answer to some of the problems we face as users
            of the modern internet.
          </p>
          <p>
            In an age where censorship is rampant and archival is an
            afterthought, we depend on downloading and storing media ourselves
            to preserve it.
          </p>
          {/* <p>
              Through a variety of tricks by the very tech companies that allow
              content to be hosted and shared, they have made it increasingly
              difficult to download their media.
            </p> */}
          <p>
            The goal of this project is to give that power back to users. Here
            you can download images and videos that are under lock and key.
          </p>
          {/* <p>
              Similar websites exist and are, for the most part, pretty good.
              But those similar websites are often riddled with advertisements,
              paywalls, and watermarks.
            </p> */}
          <p>
            SocialSnapper gathers multiple services into one place so you're not
            constantly searching everytime you need to download a video.
          </p>
          {/* <p>
              SocialSnapper has none of those invasions of privacy. We are
              transparent and open to suggestions. If you have ideas on how to
              improve SocialSnapper please check out our contact page.
            </p> */}
        </div>
        <div className="about-div">
          <h3>
            <i className="fas fa-caret-right" /> How does it work?
          </h3>
          <p>
            SocialSnapper began as an opportunity to learn{" "}
            <a
              href="https://reactjs.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              React.js
            </a>{" "}
            and evolved into a useful tool.
          </p>
          <p>
            This website is a React app and is supported by a Flask server and a
            website specifically made to combine audio and video for the Reddit
            section.
          </p>

          <p>
            The Flask server acts as the brain of the application and is an API
            for fetching download links to the content.
          </p>
          <p>
            The Reddit file combiner is an iframe of a second website I
            developed using{" "}
            <a
              href="https://github.com/bgrins/videoconverter.js"
              rel="noopener noreferrer"
              target="_blank"
            >
              videoconverter.js
            </a>
            .{" "}
          </p>
        </div>
        <div className="about-div">
          <h3>
            <i className="fas fa-caret-right" /> Acknowledgments
          </h3>
          <p>
            Video and audio conversion depends on{" "}
            <a
              href="https://github.com/bgrins/videoconverter.js"
              rel="noopener noreferrer"
              target="_blank"
            >
              videoconverter.js
            </a>
            . Shout out to them and{" "}
            <a
              href="https://www.ffmpeg.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              ffmpeg
            </a>
            .
          </p>
          <p>
            Favicon courtesy of{" "}
            <a
              href="https://thenounproject.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://thenounproject.com/
            </a>
            .
          </p>
        </div>
        <div className="about-div">
          <h3>
            <i className="fas fa-caret-right" /> Disclaimer
          </h3>
          <p>
            SocialSnapper does not host or save any of the videos or images that
            users may use it to obtain. We do not own or host any of the content
            from any of these social media websites. This service is provided
            free of charge.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export default AboutPage;
