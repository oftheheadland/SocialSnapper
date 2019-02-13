import React, { Component } from 'react';

import 'react-tabs/style/react-tabs.css';

class Youtube extends Component {
  constructor() {
    super();
    this.state = {
      youtubeData: {},
      youtubeReady: false,
      youtubeWarning: false,
      youtubeError: false,
      attemptedSearch: false,
      youtubeLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // REDDIT
  handleYoutube(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.youtubeURLinput) {
      this.setState({ youtubeError: false });
      if (this.state.youtubeURLinput.includes('playlist')) {
        this.setState({ youtubeWarning: true });
        console.log('playlist');
      } else {
        this.setState({ youtubeWarning: false });
        this.setState({ youtubeLoading: true });
        this.setState({ attemptedSearch: true });
        let url = 'https://conversion-api-test.herokuapp.com/youtubeAPI';
        let youtubeVideoURL = this.state.youtubeURLinput;

        // Build formData object.
        let formData = new FormData();
        formData.append('youtubeURL', youtubeVideoURL);

        const that = this;

        // fetch from api
        fetch(url, {
          method: 'POST',
          body: formData,
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(jsonData) {
            that.setState({ attemptedSearch: true });
            that.setState({ youtubeData: jsonData });
            that.setState({ youtubeReady: true });
            that.setState({ youtubeLoading: false });
            console.log('done');
            console.log(jsonData);
            if (jsonData['message']) {
              console.log('there was an error');
              that.setState({ youtubeError: true });
            }
          })
          .catch((error) => console.error('Error:', error));
      }
    }
  }
  render() {
    const displayYoutubeResults = this.state.youtubeReady;
    const youtubeWarningMessage = <div style={{ textAlign: 'center' }}>Playlists are not currently supported.</div>;

    const youtubeErrorState = this.state.youtubeError;
    const youtubeErrorMessage = (
      <div style={{ textAlign: 'center' }}>
        There was an error with your request. Try again or use a different video.
      </div>
    );

    const displayYoutubeLoading = this.state.youtubeLoading;

    const youtubeLoader = (
      <div className="reddit-download-container">
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );

    let youtubeWarning = this.state.youtubeWarning;

    const youtubeData = this.state.youtubeData['youtube'];
    console.log(youtubeData);

    let youtubeHeader;

    let audioHeader;
    let audioBlocks;

    let videoHeader;
    let videoBlocks;

    let bothHeader;
    let bothBlocks;

    if (youtubeData !== undefined) {
      const audioData = youtubeData['audio'];
      const bothData = youtubeData['both'];
      const videoData = youtubeData['video'];

      const generalData = youtubeData['general'];
      console.log(generalData);

      youtubeHeader = (
        <div>
          <p>
            ***To download, right-click on the download button (or tap and hold if using mobile) and choose the
            Save/Download option.***
          </p>
          <p>Title: {generalData[0]['title']}</p>
          <p>Thumbnail: {generalData[0]['thumbnail']}</p>
          <p>
            Link:{' '}
            <a href={generalData[0]['url']} target="_blank" rel="noopener noreferrer">
              {generalData[0]['url']}
            </a>
          </p>
          <img
            alt="youtube thumbnail"
            style={{ width: '400px' }}
            src={generalData[0]['thumbnail'].replace('default', 'hqdefault')}
          />
        </div>
      );

      bothHeader = (
        <div>
          <hr />
          <h2>Download Video</h2>
        </div>
      );
      bothBlocks = bothData.map((data, i) => (
        <div key={i}>
          <p>Quality: {data.resolution}</p>
          <p>File type: {data.mime_type}</p>
          <p>File size: {data.filesize}</p>
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={data.url}>
            Download
          </a>
        </div>
      ));

      audioHeader = (
        <div>
          <hr />
          <h2>Download Audio Only</h2>
        </div>
      );
      audioBlocks = audioData.map((data, i) => (
        <div key={i}>
          <p>Bit Rate: {data.abr}</p>
          <p>Audio Codec: {data.audio_codec}</p>
          <p>File type: {data.mime_type}</p>
          <p>File size: {data.filesize}</p>
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={data.url}>
            Download
          </a>
        </div>
      ));

      videoHeader = (
        <div>
          <hr />
          <h2>Download Video Only</h2>
        </div>
      );
      videoBlocks = videoData.map((data, i) => (
        <div key={i}>
          <p>Quality: {data.resolution}</p>
          <p>File type: {data.mime_type}</p>
          <p>File size: {data.filesize}</p>
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={data.url}>
            Download
          </a>
        </div>
      ));
    }

    return (
      <>
        <form id="youtubeForm" className="snapper-form" onSubmit={this.handleYoutube}>
          <input
            className="snapper-input"
            type="text"
            name="youtubeURLinput"
            placeholder="Youtube Video URL"
            onChange={this.handleChange}
          />
          <button className="snapper-button">Snap</button>
          <p style={{ fontSize: '14px', color: '#525252', marginTop: '20px', wordBreak: 'break-all' }}>
            Your URL should like this:{' '}
            <span style={{ color: '#525252' }}>Example youtube url: https://www.youtube.com/watch?v=pvrc0UenwKk</span>
          </p>
        </form>
        <div>
          {youtubeWarning ? youtubeWarningMessage : ''}
          {displayYoutubeLoading ? youtubeLoader : ''}

          {youtubeErrorState ? youtubeErrorMessage : ''}
          {/* {this.state.attemptedSearch && !youtubeData ? youtubeErrorMessage : ''} */}
        </div>
        <div className="youtube-download-container">
          {displayYoutubeResults ? youtubeHeader : ''}
          {displayYoutubeResults ? bothHeader : ''}
          {displayYoutubeResults ? bothBlocks : ''}

          {displayYoutubeResults ? audioHeader : ''}
          {displayYoutubeResults ? audioBlocks : ''}

          {displayYoutubeResults ? videoHeader : ''}
          {displayYoutubeResults ? videoBlocks : ''}
        </div>
      </>
    );
  }
}

export default Youtube;
