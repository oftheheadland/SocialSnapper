import React, { Component } from "react";
import FadeIn from "react-fade-in";
import "react-tabs/style/react-tabs.css";
import Popup from "react-popup";

import Loading from "./Loading";
import DownloadButton from "./DownloadButton";

class Reddit extends Component {
  constructor() {
    super();
    this.state = {
      redditVideo: "", //holds reddit video url
      redditAudio: "", //holds reddit audio url
      redditURLinput: "", //holds value of reddit search bar
      redditReady: false, // if value is true, the reddit search results are displayed
      redditLoading: false, // when true the loading animation is shown
      encodedVideo: "", // holds value of base64 encoded reddit video url
      encodedAudio: "", // holds value of base64 encoded reddit audio url
      redditTitle: "", // holds value of Reddit post title
      redditThumbnail: "", // holds url of reddit post thumbnail. not currently used
      showOptions: "none", // show or hide audio/video only options
      optionsText: "More Options"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReddit = this.handleReddit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleMoreOptions = this.handleMoreOptions.bind(this);
  }

  handleMoreOptions(event) {
    event.preventDefault();
    if (this.state.optionsText === "More Options") {
      this.setState({ showOptions: "block" });
      this.setState({ optionsText: "Less Options" });
    } else {
      this.setState({ showOptions: "none" });
      this.setState({ optionsText: "More Options" });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({ redditReady: false });
    document.getElementById("redditURLinput").value = "";
    this.setState({ redditURLinput: "" });
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
      document.getElementById("redditURLinput").value = redditURL;
      this.setState({ redditURLinput: redditURL });

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
    } else if (!this.state.redditLoading) {
      Popup.alert("Please enter a URL.");
    }
  }

  render() {
    const displayRedditResults = this.state.redditReady;
    const displayRedditLoading = this.state.redditLoading;

    var redditDownloads = (
      <FadeIn>
        <button className="reset-button" onClick={this.handleReset}>
          <i className="fas fa-times" />
        </button>
        <div className="reddit-flex-container">
          <div className="reddit-download-flex">
            <h3 style={{ marginBottom: "1.5rem" }}>{this.state.redditTitle}</h3>
            <div>
              {/* <video
                style={{ width: "100%", maxHeight: "400px" }}
                key={this.state.redditVideo}
                controls
              >
                <source src={this.state.redditVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <iframe
                title="file combiner iframe"
                src={
                  "https://combinefiles.netlify.com/?video=" +
                  this.state.encodedVideo +
                  "&audio=" +
                  this.state.encodedAudio
                }
              />
            </div>

            <a
              style={{ color: "#de311f" }}
              href="/"
              onClick={this.handleMoreOptions}
            >
              {this.state.optionsText} <i className="fas fa-caret-down" />
            </a>
            <div style={{ display: this.state.showOptions }}>
              <p style={{ fontSize: "22px" }}>Download video only </p>
              <DownloadButton href={this.state.redditVideo} />

              <hr />
              <p style={{ fontSize: "22px" }}>Download audio only</p>
              <DownloadButton href={this.state.redditAudio} />
            </div>
          </div>

          <div className="reddit-download-flex" style={{ display: "none" }}>
            <div>
              <p style={{ fontSize: "22px" }}>
                Download video with audio <br />
                <span style={{ fontSize: "14px" }}>
                  You will be redirected to a download page.
                </span>
              </p>
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

            <hr />
            <p style={{ fontSize: "22px" }}>Download audio only</p>
            <a
              className="snapper-button"
              target="_blank"
              rel="noopener noreferrer"
              href={this.state.redditAudio}
            >
              Download
            </a>
          </div>
        </div>
      </FadeIn>
    );

    if (displayRedditLoading) {
      redditDownloads = <Loading />;
    } else if (!this.state.redditTitle) {
      redditDownloads = (
        <FadeIn>
          <button className="reset-button" onClick={this.handleReset}>
            <i className="fas fa-times" />
          </button>
          <p className="error-message">
            Error. Make sure this is a v.redd.it video. <br /> Your URL should
            look like this:{" "}
            <a
              href="https://www.reddit.com/r/aww/comments/arz9u2/happy_baby_donkey/"
              style={{ color: "rgb(228, 55, 37)", wordBreak: "break-all" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.reddit.com/r/aww/comments/arz9u2/happy_baby_donkey/
            </a>
          </p>
        </FadeIn>
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
          Here you can download v.redd.it Reddit posts with audio.
        </p>
        <button onClick={this.handleDemo} className="snapper-button">
          View Example <i className="fas fa-angle-double-right" />
        </button>
        {/* <a href="" onClick={this.handleDemo}>
          Click here
        </a>{" "}
        to see a demonstration. */}
      </div>
    );

    return (
      <FadeIn>
        <form className="snapper-form" onSubmit={this.handleReddit}>
          <div className="input-group snapper-form-div">
            <Popup />
            <input
              className="snapper-input"
              type="text"
              name="redditURLinput"
              id="redditURLinput"
              placeholder="Reddit v.redd.it Post URL"
              onChange={this.handleChange}
            />
            <button className="snapper-button search-button">
              <i className="fas fa-search" />
            </button>
          </div>
          <div>{displayRedditResults ? "" : redditDemo}</div>
        </form>
        <div className="reddit-download-container">
          {displayRedditResults ? redditDownloads : ""}
        </div>
      </FadeIn>
    );
  }
}

export default Reddit;
