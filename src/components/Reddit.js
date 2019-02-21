import React, { Component } from "react";

import "react-tabs/style/react-tabs.css";
import Loading from "./Loading";

class Reddit extends Component {
  constructor() {
    super();
    this.state = {
      redditVideo: "", //holds reddit video url
      redditAudio: "", //holds reddit audio url
      redditURLinput: "", //holds value of reddit search bar
      redditReady: false, // if value is true, the reddit search results are displayed
      redditLoading: false, // when true the loading animation is shown
      encodedVideo: "", // holds value of bse64 encoded reddit video url
      encodedAudio: "", // holds value of bse64 encoded reddit audio url
      redditTitle: "", // holds value of Reddit post title
      redditThumbnail: "" // holds url of reddit post thumbnail. not currently used
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReddit = this.handleReddit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // handles the "Try it out" button
  handleDemo(event) {
    event.preventDefault();
    if (!this.state.redditLoading) {
      this.setState({ redditLoading: true });
      this.setState({ redditReady: true });

      let url = "https://snapperapi.herokuapp.com/redditAPI";
      let redditURL =
        "https://www.reddit.com/r/aww/comments/arz9u2/happy_baby_donkey/";

      let formData = new FormData(); // Build formData object.
      formData.append("redditURL", redditURL);

      const that = this;

      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonData) {
          that.setState({ redditVideo: jsonData["video"] });
          that.setState({ redditAudio: jsonData["audio"] });
          that.setState({ redditTitle: jsonData["title"] });
          that.setState({ redditThumbnail: jsonData["thumbnail"] });
          that.setState({ redditReady: true });
          that.setState({ redditLoading: false });
          that.setState({ encodedVideo: btoa(jsonData["video"]) });
          that.setState({ encodedAudio: btoa(jsonData["audio"]) });
        })
        .catch(error => console.error("Error:", error));
    }
  }

  handleReddit(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.redditURLinput && !this.state.redditLoading) {
      this.setState({ redditLoading: true });
      this.setState({ redditReady: true });

      let url = "https://snapperapi.herokuapp.com/redditAPI";
      let redditURL = this.state.redditURLinput;

      let formData = new FormData(); // Build formData object.
      formData.append("redditURL", redditURL);

      const that = this;

      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonData) {
          that.setState({ redditVideo: jsonData["video"] });
          that.setState({ redditAudio: jsonData["audio"] });
          that.setState({ redditTitle: jsonData["title"] });
          that.setState({ redditThumbnail: jsonData["thumbnail"] });
          that.setState({ redditReady: true });
          that.setState({ redditLoading: false });
          that.setState({ encodedVideo: btoa(jsonData["video"]) });
          that.setState({ encodedAudio: btoa(jsonData["audio"]) });
        })
        .catch(error => console.error("Error:", error));
    }
  }

  render() {
    const displayRedditResults = this.state.redditReady;
    const displayRedditLoading = this.state.redditLoading;

    var redditDownloads = (
      <div>
        <div className="reddit-flex-container">
          <div className="reddit-download-flex">
            <h3 style={{ marginBottom: "1.5rem" }}>{this.state.redditTitle}</h3>
            <div>
              <video
                style={{ width: "100%", maxHeight: "400px" }}
                key={this.state.redditVideo}
                controls
              >
                <source src={this.state.redditVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="reddit-download-flex">
            <div>
              <p style={{ fontSize: "22px" }}>Download video with audio</p>
              <a
                className="snapper-button"
                target="_blank"
                rel="noopener noreferrer"
                href={
                  "https://combinefiles.netlify.com/?video=" +
                  this.state.encodedVideo +
                  "&audio=" +
                  this.state.encodedAudio
                }
              >
                Download
              </a>
            </div>
            <hr />
            <div>
              <p style={{ fontSize: "22px" }}>Download video only </p>
              <a
                className="snapper-button"
                target="_blank"
                rel="noopener noreferrer"
                href={this.state.redditVideo}
              >
                Download
              </a>
            </div>

            <p style={{ display: "none" }}>
              Download audio only <br />
              <a
                className="snapper-button"
                target="_blank"
                rel="noopener noreferrer"
                href={this.state.redditAudio}
              >
                Download
              </a>
            </p>
          </div>
        </div>
      </div>
    );

    if (displayRedditLoading) {
      redditDownloads = <Loading />;
    } else if (!this.state.redditTitle) {
      redditDownloads = (
        <p className="error-message">
          Error. Make sure this is a v.redd.it video.
        </p>
      );
    }
    let redditDemo = (
      <div>
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
          This tab is for downloading video posts - specifically v.reddit posts
          - which are normally not available for download.
        </p>
        <button onClick={this.handleDemo} className="snapper-button">
          Try it out!
        </button>
      </div>
    );

    return (
      <>
        <form className="snapper-form" onSubmit={this.handleReddit}>
          <input
            className="snapper-input"
            type="text"
            name="redditURLinput"
            placeholder="Reddit Video Post URL"
            onChange={this.handleChange}
          />
          <button className="snapper-button">Snap</button>

          <div>{displayRedditResults ? "" : redditDemo}</div>
        </form>
        <div className="reddit-download-container">
          {displayRedditResults ? redditDownloads : ""}
        </div>
      </>
    );
  }
}

export default Reddit;
