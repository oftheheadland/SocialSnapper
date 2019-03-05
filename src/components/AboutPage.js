import React from "react";
import FadeIn from "react-fade-in";

function AboutPage() {
  return (
    <FadeIn>
      <div className="about-container">
        <h1>About</h1>
        <hr />
        <div>
          <h3>
            <i className="fas fa-caret-right" /> How do I use it?
          </h3>
          <p>
            Copy the link from your browser's address bar of content you would
            like to save. Paste the entire link into SocialSnapper under the
            relevant tab.
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
                  supported but we have plans for it <br />
                  <a href="/contact">Contact us</a> if you would like this.{" "}
                  <br />
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
                  <br />
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

          <div>
            <h3>
              <i className="fas fa-caret-right" /> Why?
            </h3>
            <p>
              SocialSnapper is an answer to some of the problems we face as
              users of the modern internet.
            </p>
            <p>
              In an age where censorship is rampant and archival is an
              afterthought, we depend on downloading and storing media ourselves
              to preserve it.
            </p>
            <p>
              Through a variety of tricks by the very tech companies that allow
              content to be hosted and shared, they have made it increasingly
              difficult to download their media.
            </p>
            <p>
              The goal of this project is to give that power back to users. Here
              you can download images and videos that are under lock and key.
            </p>
            <p>
              Similar websites exist and are, for the most part, pretty good.
              But those similar websites are often riddled with advertisements,
              paywalls, and watermarks.
            </p>
            <p>
              SocialSnapper gathers multiple services into one place so you're
              not constantly searching everytime you need to download a video.
            </p>
            <p>
              SocialSnapper has none of those invasions of privacy. We are
              transparent and open to suggestions. If you have ideas on how to
              improve SocialSnapper please check out our contact page.
            </p>
            <p>
              Here there will be explanation of what the app does, how it was
              built, how it works, and some examples of its functions.
            </p>
          </div>
          <div>
            <h3>
              <i className="fas fa-caret-right" /> How does it work?
            </h3>
            <p>
              SocialSnapper began as an opportunity to learn{" "}
              <a href="https://reactjs.org/" rel="n">
                React.js
              </a>
              .
            </p>
            <p>
              Mention the github repo for the videoconverter website, attribute
              ffmpeg
            </p>
            <p>Favicon courtesy of https://thenounproject.com/</p>
            <p>
              To learn more about how the video conversion works please visit{" "}
              <a href="https://github.com/oftheheadland/videoconverter">
                https://github.com/oftheheadland/videoconverter
              </a>
            </p>
            <p>
              The Reddit audio and video combination is actually done in an
              iframe of a separate website I've developed.
            </p>
            This website is a React app but it is supported by a Node.js server,
            a Flask server, and 1 other website.
            <ul>
              <li>
                A Flask Server built by me. Acts as the brain of the application
                and is an API for fetching download links to the content.
              </li>
              <li>
                A Node.js server forked from
                https://github.com/Rob--W/cors-anywhere. Purpose: Avoiding
                CORS-related issues with Reddit.com
              </li>
              <li>
                The Reddit file combiner is actually an iframe of a second
                website I developed using
                https://github.com/bgrins/videoconverter.js. Shout out to them
                and https://www.ffmpeg.org/
              </li>
            </ul>
          </div>
          <div>
            <h3>
              <i className="fas fa-caret-right" /> Acknowledgments
            </h3>
            <p>
              {" "}
              using https://github.com/bgrins/videoconverter.js. Shout out to
              them and https://www.ffmpeg.org/
            </p>
          </div>
          <div>
            <h3>
              <i className="fas fa-caret-right" /> Disclaimer
            </h3>
            <p>
              SocialSnapper does not host or save any of the videos or images
              that users may use it to obtain. We do not own or host any of the
              content provided from any of these social media websites. This
              service is provided free of charge and developed by a very tired
              developer.
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default AboutPage;
