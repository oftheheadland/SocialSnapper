import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import FadeIn from "react-fade-in/lib/FadeIn";
import Popup from "react-popup";

import Loading from "./Loading";
import DownloadButton from "./DownloadButton";

class Twitch extends Component {
  constructor() {
    super();
    this.state = {
      twitchClipMP4: "", // holds clip mp4 link
      twitchClipTitle: "", // holds clip title
      twitchClipFound: false, // holds clip title
      twitchURLinput: "", // holds value of the search input
      twitchLoading: false, // when true displays loading animation
      twitchError: false, // when true displays error message
      twitchDemo: true // when true, shows the "Try it out" button
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTwitch = this.handleTwitch.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({ twitchDemo: true });
    this.setState({ twitchClipFound: false });
    this.setState({ twitchError: false });
    document.getElementById("twitchURLInput").value = "";
    this.setState({ twitchURLinput: "" });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleTwitch(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    if (this.state.twitchURLinput && !this.state.twitchLoading) {
      this.setState({ twitchDemo: false });
      this.setState({ twitchLoading: true });
      this.setState({ twitchError: false });
      this.setState({ twitchClipFound: false });

      let url = "https://snapperapi.herokuapp.com/twitchAPI";
      let twitchURL = this.state.twitchURLinput;

      // sanitize user input; remove empty spaces
      let cleanTwitchURL = twitchURL.split(" ").join("");

      // Build formData object.
      let formData = new FormData();
      formData.append("url", cleanTwitchURL);

      const that = this;
      let apiFailed = false;
      // fetch from api
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          if (response.status !== 200) {
            that.setState({ twitchError: true });
            that.setState({ twitchLoading: false });
            apiFailed = true;
          } else {
            return response.json();
          }
        })
        .then(function(jsonData) {
          if (!apiFailed) {
            that.setState({ twitchClipMP4: jsonData["url"] });
            that.setState({ twitchClipTitle: jsonData["title"] });
            that.setState({ twitchClipFound: true });
            that.setState({ twitchLoading: false });
          }
        })
        .catch(error => console.error("Error:", error));
    } else if (!this.state.twitchLoading) {
      Popup.alert("Please enter a URL");
    }
  }

  handleDemo(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    if (!this.state.twitchLoading) {
      this.setState({ twitchDemo: false });
      this.setState({ twitchLoading: true });
      this.setState({ twitchError: false });

      let url = "https://snapperapi.herokuapp.com/twitchAPI";
      let twitchURL =
        "https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy";
      document.getElementById("twitchURLInput").value = twitchURL;
      this.setState({ twitchURLinput: twitchURL });

      // sanitize user input; remove empty spaces
      let cleanTwitchURL = twitchURL.split(" ").join("");

      // Build formData object.
      let formData = new FormData();
      formData.append("url", cleanTwitchURL);

      const that = this;
      let apiFailed = false;
      // fetch from api
      fetch(url, {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          if (response.status !== 200) {
            that.setState({ twitchError: true });
            that.setState({ twitchLoading: false });
            apiFailed = true;
          } else {
            return response.json();
          }
        })
        .then(function(jsonData) {
          if (!apiFailed) {
            that.setState({ twitchClipMP4: jsonData["url"] });
            that.setState({ twitchClipTitle: jsonData["title"] });
            that.setState({ twitchClipFound: true });
            that.setState({ twitchLoading: false });
          }
        })
        .catch(error => console.error("Error:", error));
    }
  }

  render() {
    const twitchContent = this.state.twitchLoading ? (
      ""
    ) : (
      <FadeIn>
        <div className="instagramCol">
          <div>
            <p>{this.state.twitchClipTitle}</p>
            <video key={this.state.twitchClipMP4} width="90%" controls>
              <source src={this.state.twitchClipMP4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <DownloadButton href={this.state.twitchClipMP4} />
        </div>
      </FadeIn>
    );

    let twitchDemo = (
      <div>
        <p className="url-tip">
          Your URL should look like this:{" "}
          <a
            href="https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy"
            style={{ color: "rgb(228, 55, 37)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy
          </a>
        </p>
        <p className="url-tip">
          Here you can download Twitch.tv clips in HD quality.
        </p>
        <button onClick={this.handleDemo} className="snapper-button">
          View Example <i className="fas fa-angle-double-right" />
        </button>
      </div>
    );

    return (
      <FadeIn>
        <form className="snapper-form" onSubmit={this.handleTwitch}>
          <div className="input-group snapper-form-div">
            <Popup />
            <input
              className="snapper-input"
              type="text"
              name="twitchURLinput"
              id="twitchURLInput"
              placeholder="Twitch Clip URL"
              onChange={this.handleChange}
            />
            <button className="snapper-button search-button">
              <i className="fas fa-search" />
            </button>
          </div>
          <div>{this.state.twitchDemo ? twitchDemo : ""}</div>
        </form>

        <div className="insta-download-container">
          {this.state.twitchError ? (
            <div className="error-message">
              <button
                className="reset-button reset-button-twitch"
                onClick={this.handleReset}
              >
                <i className="fas fa-times" />
              </button>
              Error with your search. Please use a valid Twitch Clip URL. Your
              URL should look like this:{" "}
              <a
                href="https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy"
                style={{ color: "rgb(228, 55, 37)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                https://clips.twitch.tv/ObedientBenevolentBasenjiNinjaGrumpy
              </a>
            </div>
          ) : (
            ""
          )}
          {this.state.twitchLoading ? <Loading /> : ""}
          <div className="twitch-flex-container">
            {this.state.twitchClipFound ? (
              <>
                <button
                  className="reset-button reset-button-twitch"
                  onClick={this.handleReset}
                >
                  <i className="fas fa-times" />
                </button>
                {twitchContent}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default Twitch;
