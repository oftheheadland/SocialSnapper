import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";

import Loading from "./Loading";

class Twitch extends Component {
  constructor() {
    super();
    this.state = {
      twitchClipMP4: "", // holds clip mp4 link
      twitchClipTitle: "", // holds clip title
      twitchClipFound: false, // holds clip title
      twitchURL: "", // holds value of the search input
      twitchLoading: false, // when true displays loading animation
      twitchError: false, // when true displays error message
      twitchDemo: true // when true, shows the "Try it out" button
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTwitch = this.handleTwitch.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
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
            console.log(jsonData);
            console.log(jsonData["url"]);
            console.log(jsonData["title"]);
            that.setState({ twitchClipMP4: jsonData["url"] });
            that.setState({ twitchClipTitle: jsonData["title"] });
            that.setState({ twitchClipFound: true });
            that.setState({ twitchLoading: false });
          }
        })
        .catch(error => console.error("Error:", error));
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
            console.log(jsonData);
            console.log(jsonData["url"]);
            console.log(jsonData["title"]);
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
    const twitchContent = (
      <div>
        <div className="instagramCol">
          <div>
            <p>{this.state.twitchClipTitle}</p>
            <video key={this.state.twitchClipMP4} width="100%" controls>
              <source src={this.state.twitchClipMP4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <a
            className="snapper-button"
            target="_blank"
            rel="noopener noreferrer"
            href={this.state.twitchClipMP4}
          >
            Download
          </a>
        </div>
      </div>
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
        <p className="url-tip">This tab is for downloading Twitch.TV Clips.</p>
        <button onClick={this.handleDemo} className="snapper-button">
          Try it out!
        </button>
      </div>
    );

    return (
      <>
        <form
          id="twitchForm"
          className="snapper-form"
          onSubmit={this.handleTwitch}
        >
          <input
            className="snapper-input"
            type="text"
            name="twitchURLinput"
            placeholder="Twitch Clip URL"
            onChange={this.handleChange}
          />
          <button className="snapper-button">Search</button>

          <div>{this.state.twitchDemo ? twitchDemo : ""}</div>
        </form>

        <div className="insta-download-container">
          {this.state.twitchError ? (
            <div className="error-message">
              Error with your search. Please use a valid Twitch Clip URL.
            </div>
          ) : (
            ""
          )}
          {this.state.twitchLoading ? <Loading /> : ""}
          <div className="twitch-flex-container">
            {this.state.twitchClipFound ? twitchContent : ""}
          </div>
        </div>
      </>
    );
  }
}

export default Twitch;
