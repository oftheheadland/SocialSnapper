import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";

import Loading from "./Loading";
import VideoTable from "./Youtube/VideoTable";
import AudioTable from "./Youtube/AudioTable";
import BothTable from "./Youtube/BothTable";
import FadeIn from "react-fade-in/lib/FadeIn";

class Youtube extends Component {
  constructor() {
    super();
    this.state = {
      youtubeData: {}, // holds object obtained from flask server api. holds all links/formats/info
      youtubeReady: false, // when ready the results are displayed
      youtubeWarning: false, // shows message stating 'Playlists are not supported' when user searches playlists
      youtubeError: false, // shows error message for invalid searches
      youtubeLoading: false, // shows loading animation
      youtubeDemo: true // shows 'Try it out' button
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({ youtubeDemo: true });
    this.setState({ youtubeReady: false });
    this.setState({ youtubeWarning: false });
    this.setState({ youtubeError: false });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDemo(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    this.setState({ youtubeError: false });
    this.setState({ youtubeDemo: false });
    this.setState({ youtubeData: "" });
    this.setState({ youtubeWarning: false });
    this.setState({ youtubeLoading: true });
    this.setState({ youtubeReady: false });
    let url = "https://snapperapi.herokuapp.com/youtubeAPI";
    let youtubeVideoURL = "https://www.youtube.com/watch?v=a3lcGnMhvsA";

    // Build formData object.
    let formData = new FormData();
    formData.append("youtubeURL", youtubeVideoURL);

    const that = this;

    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(function(response) {
        if (response.status !== 200) {
          that.setState({ youtubeError: true });
          that.setState({ youtubeData: "" });
          that.setState({ youtubeLoading: false });
          return false;
        } else {
          return response.json();
        }
      })
      .then(function(jsonData) {
        if (jsonData !== false) {
          that.setState({ youtubeData: jsonData });
          that.setState({ youtubeReady: true });
          that.setState({ youtubeLoading: false });
        }
      })
      .catch(error => console.error("Error:", error));
  }

  handleYoutube(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.youtubeURLinput && !this.state.youtubeLoading) {
      this.setState({ youtubeError: false });
      this.setState({ youtubeDemo: false });
      if (this.state.youtubeURLinput.includes("playlist")) {
        this.setState({ youtubeWarning: true });
        this.setState({ youtubeData: "" });
        this.setState({ youtubeReady: false });
      } else {
        this.setState({ youtubeData: "" });
        this.setState({ youtubeWarning: false });
        this.setState({ youtubeLoading: true });
        this.setState({ youtubeReady: false });
        let url = "https://snapperapi.herokuapp.com/youtubeAPI";
        let youtubeVideoURL = this.state.youtubeURLinput;

        // Build formData object.
        let formData = new FormData();
        formData.append("youtubeURL", youtubeVideoURL);

        const that = this;

        fetch(url, {
          method: "POST",
          body: formData
        })
          .then(function(response) {
            if (response.status !== 200) {
              that.setState({ youtubeError: true });
              that.setState({ youtubeData: "" });
              that.setState({ youtubeLoading: false });
              return false;
            } else {
              return response.json();
            }
          })
          .then(function(jsonData) {
            if (jsonData !== false) {
              that.setState({ youtubeData: jsonData });
              that.setState({ youtubeReady: true });
              that.setState({ youtubeLoading: false });
            }
          })
          .catch(error => console.error("Error:", error));
      }
    } else if (!this.state.youtubeLoading) {
      alert("Please enter a URL");
    }
  }
  render() {
    const displayYoutubeResults = this.state.youtubeReady;
    const youtubeWarningMessage = (
      <p className="error-message">
        <button className="reset-button" onClick={this.handleReset}>
          <i className="fas fa-times" />
        </button>
        Playlists are not currently supported.
      </p>
    );

    const youtubeErrorMessage = (
      <p className="error-message">
        {/* There was an error with your request. Try again or use a different
        video. Could be related to an issue with{" "}
        <a href="https://github.com/nficano/pytube">Pytube</a>. Waiting for a
        fix. */}
        <button className="reset-button" onClick={this.handleReset}>
          <i className="fas fa-times" />
        </button>
        Error with your search. Try again or use a different video. <br />
        Your URL should look like this:{" "}
        <a
          href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
          style={{ color: "rgb(228, 55, 37)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.youtube.com/watch?v=a3lcGnMhvsA
        </a>
      </p>
    );

    const displayYoutubeLoading = this.state.youtubeLoading;

    let youtubeWarning = this.state.youtubeWarning;

    const youtubeData = this.state.youtubeData["youtube"];

    let youtubeHeader;

    // let youtubeHighest;

    let audioRows;
    let videoRows;
    let bothRows;

    if (youtubeData !== undefined) {
      const audioData = youtubeData["audio"];
      const bothData = youtubeData["both"];
      const videoData = youtubeData["video"];
      const generalData = youtubeData["general"];

      youtubeHeader = (
        <div className="youtube-header">
          <h3>{generalData[0]["title"]}</h3>
          <a
            href={generalData[0]["url"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="youtube thumbnail"
              className="youtube-thumbnail"
              src={generalData[0]["thumbnail"].replace("default", "hqdefault")}
            />
          </a>
        </div>
      );

      bothRows = bothData.map((data, i) => (
        <tr key={i}>
          <td>
            {data.resolution} {data.fps}fps
          </td>
          <td>{data.mime_type.replace("video/", "")}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>

          <td>
            {" "}
            <a
              className="snapper-button youtube-button"
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
            >
              Download
            </a>
          </td>
        </tr>
      ));

      audioRows = audioData.map((data, i) => (
        <tr key={i}>
          <td>{data.abr}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>
          <td>
            {" "}
            <a
              className="snapper-button youtube-button"
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
            >
              Download
            </a>
          </td>
        </tr>
      ));

      videoRows = videoData.map((data, i) => (
        <tr key={i}>
          <td>
            {data.resolution || "Unknown"} {data.fps}fps
          </td>
          <td>{data.mime_type.replace("video/", "")}</td>
          <td>{data.filesize}</td>
          <td>
            {" "}
            <a
              className="snapper-button youtube-button"
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
            >
              Download
            </a>
          </td>
        </tr>
      ));
    }

    let youtubeDemo = (
      <div>
        <p className="url-tip">
          Your URL should look like this:{" "}
          <a
            href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
            style={{ color: "rgb(228, 55, 37)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.youtube.com/watch?v=a3lcGnMhvsA
          </a>
        </p>
        <p className="url-tip">
          Here you can download Youtube videos in HD or choose from all
          available formats.
        </p>
        <button onClick={this.handleDemo} className="snapper-button">
          View Example
        </button>
        {/* <a href="" onClick={this.handleDemo}>
          Click here
        </a>{" "}
        to see a demonstration. */}
      </div>
    );

    return (
      <FadeIn>
        <form className="snapper-form" onSubmit={this.handleYoutube}>
          <div className="input-group snapper-form-div">
            <input
              className="snapper-input"
              type="text"
              name="youtubeURLinput"
              placeholder="Youtube Video URL"
              onChange={this.handleChange}
            />
            <button className="snapper-button search-button">Submit</button>
          </div>

          <div>{this.state.youtubeDemo ? youtubeDemo : ""}</div>
        </form>

        <div className="youtube-outer-shell" style={{ margin: "auto" }}>
          <div className="youtube-download-container" style={{ width: "100%" }}>
            {youtubeWarning ? <FadeIn>{youtubeWarningMessage}</FadeIn> : ""}
            {displayYoutubeLoading ? <Loading /> : ""}

            {this.state.youtubeError ? (
              <FadeIn>{youtubeErrorMessage}</FadeIn>
            ) : (
              ""
            )}

            {displayYoutubeResults ? (
              <FadeIn>
                <button className="reset-button" onClick={this.handleReset}>
                  <i className="fas fa-times" />
                </button>
                <div style={{ paddingTop: "30px" }}>{youtubeHeader}</div>

                <BothTable bothRows={bothRows} />
                <AudioTable audioRows={audioRows} />
                <VideoTable videoRows={videoRows} />
              </FadeIn>
            ) : (
              ""
            )}
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default Youtube;
