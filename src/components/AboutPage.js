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
            1. Copy the URL from your browser's address bar of the content you
            would like to save.
          </p>
          <p>2. Paste the entire link into the input under the relevant tab.</p>
          <p>
            3. Right click the Download button and select{" "}
            <strong>Save Link As...</strong>
          </p>

          <p>
            4. Click the reset button ({" "}
            {/* <button className="reset-button demo-reset-button">
              <i className="fas fa-times" />
            </button>{" "} */}
            <i className="fas fa-times" style={{ color: "rgb(197, 0, 0)" }} /> ){" "}
            to search again.
          </p>

          <p>See more information and examples below.</p>
          <br />
          <div>
            <h4>
              <i className="fab fa-reddit-alien" /> Reddit
            </h4>
            <p className="url-tip">
              Works with any v.redd.it video. Just copy the link of the post
              containing the video.
            </p>
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
              Shortened URL versions also work. Example:{" "}
              <a
                href="https://v.redd.it/ue83vad6ych21"
                style={{ color: "rgb(228, 55, 37)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://v.redd.it/ue83vad6ych21
              </a>
            </p>

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

            <h4>
              <i className="fab fa-instagram" /> Instagram
            </h4>
            <p className="url-tip">
              Works on Posts, Stories, Highlights, and Profiles. Examples:
            </p>
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

            <h4>
              <i className="fab fa-youtube" /> YouTube
            </h4>
            <p className="url-tip">
              Any YouTube Video will work. Playlists are not currently
              supported.
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

            <h4>
              <i className="fab fa-twitch" /> Twitch
            </h4>
            <p className="url-tip">
              Any Twitch.tv Clip with the exception of banned or deleted clips.
              Videos and streams are not supported.
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
            you can download images and videos that are difficult to save.
          </p>
          {/* <p>
              Similar websites exist and are, for the most part, pretty good.
              But those similar websites are often riddled with advertisements,
              paywalls, and watermarks.
            </p> */}
          <p>
            SocialSnapper gathers multiple services into one place to avoid the
            frustration of memorizing multiple websites that often paywalled and
            full of ads.
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
            This website is bootstrapped with{" "}
            <a
              href="https://github.com/facebook/create-react-app"
              rel="noopener noreferrer"
              target="_blank"
            >
              Create React App
            </a>{" "}
            and is supported by a Python Flask server.
          </p>

          <p>
            The Flask server acts as the brain of the application and fetches
            the download links to the content.
          </p>
          <p>
            Reddit serves videos as separate audio and video files.
            SocialSnapper combines them in your browser for your convenience.
          </p>
          <p>
            Youtube also serves audio and video separately for resolutions
            higher than 720p. You are able to download the highest quality audio
            and video files separately and combine them yourself.
          </p>
        </div>
        <div className="about-div">
          <h3>
            <i className="fas fa-caret-right" /> Acknowledgments
          </h3>
          <p>
            Combining the audio and video of Reddit videos depends on{" "}
            <a
              href="https://github.com/bgrins/videoconverter.js"
              rel="noopener noreferrer"
              target="_blank"
            >
              videoconverter.js
            </a>{" "}
            and{" "}
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
              thenounproject
            </a>
            .
          </p>
          <p>
            The YouTube section relies on{" "}
            <a
              href="https://github.com/nficano/pytube "
              rel="noopener noreferrer"
              target="_blank"
            >
              pytube
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
