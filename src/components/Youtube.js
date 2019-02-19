import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';

import Loading from './Loading';

class Youtube extends Component {
  constructor() {
    super();
    this.state = {
      youtubeData: {}, // holds object obtained from flask server api. holds all links/formats/info
      youtubeReady: false, // when ready the results are displayed
      youtubeWarning: false, // shows message stating 'Playlists are not supported' when user searches playlists
      youtubeError: false, // shows error message for invalid searches
      youtubeLoading: false, // shows loading animation
      youtubeDemo: true, // shows 'Try it out' button
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDemo(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    this.setState({ youtubeError: false });
    this.setState({ youtubeDemo: false });
    this.setState({ youtubeData: '' });
    this.setState({ youtubeWarning: false });
    this.setState({ youtubeLoading: true });
    let url = 'https://conversion-api-test.herokuapp.com/youtubeAPI';
    let youtubeVideoURL = 'https://www.youtube.com/watch?v=a3lcGnMhvsA';

    // Build formData object.
    let formData = new FormData();
    formData.append('youtubeURL', youtubeVideoURL);

    const that = this;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(function(response) {
        if (response.status !== 200) {
          that.setState({ youtubeError: true });
          that.setState({ youtubeData: '' });
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
      .catch((error) => console.error('Error:', error));
  }

  handleYoutube(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.youtubeURLinput && !this.state.youtubeLoading) {
      this.setState({ youtubeError: false });
      this.setState({ youtubeDemo: false });
      if (this.state.youtubeURLinput.includes('playlist')) {
        this.setState({ youtubeWarning: true });
        this.setState({ youtubeData: '' });
      } else {
        this.setState({ youtubeData: '' });
        this.setState({ youtubeWarning: false });
        this.setState({ youtubeLoading: true });
        let url = 'https://conversion-api-test.herokuapp.com/youtubeAPI';
        let youtubeVideoURL = this.state.youtubeURLinput;

        // Build formData object.
        let formData = new FormData();
        formData.append('youtubeURL', youtubeVideoURL);

        const that = this;

        fetch(url, {
          method: 'POST',
          body: formData,
        })
          .then(function(response) {
            if (response.status !== 200) {
              that.setState({ youtubeError: true });
              that.setState({ youtubeData: '' });
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
          .catch((error) => console.error('Error:', error));
      }
    }
  }
  render() {
    const displayYoutubeResults = this.state.youtubeReady;
    const youtubeWarningMessage = (
      <div style={{ textAlign: 'center', padding: '20px' }}>Playlists are not currently supported.</div>
    );

    const youtubeErrorState = this.state.youtubeError;
    const youtubeErrorMessage = (
      <p className="error-message">
        There was an error with your request. Try again or use a different video. Could be related to an issue with{' '}
        <a href="https://github.com/nficano/pytube">Pytube</a>. Waiting for a fix.
      </p>
    );

    const displayYoutubeLoading = this.state.youtubeLoading;

    const youtubeLoader = <Loading />;

    let youtubeWarning = this.state.youtubeWarning;

    const youtubeData = this.state.youtubeData['youtube'];

    let youtubeHeader;

    let youtubeHighest;

    let audioHeader;
    let audioTopRow;
    let audioRows;
    let audioTable;

    let videoHeader;
    let videoTopRow;
    let videoRows;
    let videoTable;

    let bothHeader;
    let bothTopRow;
    let bothRows;
    let bothTable;

    if (youtubeData !== undefined) {
      const audioData = youtubeData['audio'];
      const bothData = youtubeData['both'];
      const videoData = youtubeData['video'];
      const highestData = youtubeData['highest'];
      const generalData = youtubeData['general'];

      if (!youtubeData['highest'][0]['tooLarge']) {
        youtubeHighest = (
          <div style={{ padding: '30px' }}>
            <p style={{ fontSize: '22px' }}>
              Download Highest Quality <br /> ({highestData[0]['resolution']} {highestData[0]['bitrate']})
            </p>
            <a
              className="snapper-button"
              target="_blank"
              rel="noopener noreferrer"
              href={
                'https://combinefiles.netlify.com/?video=' +
                btoa(highestData[0]['videoURL']) +
                '&audio=' +
                btoa(highestData[0]['audioURL'])
              }
            >
              Download
            </a>
          </div>
        );
      } else {
        youtubeHighest = '';
      }

      youtubeHeader = (
        <div className="youtube-header">
          <h3>{generalData[0]['title']}</h3>
          <a href={generalData[0]['url']} target="_blank" rel="noopener noreferrer">
            <img
              alt="youtube thumbnail"
              className="youtube-thumbnail"
              src={generalData[0]['thumbnail'].replace('default', 'hqdefault')}
            />
          </a>
        </div>
      );

      bothHeader = (
        <div>
          <h3 className="youtube-title">Download Video with Audio</h3>
        </div>
      );

      bothTopRow = (
        <tr>
          <th>Quality</th>
          <th>Type</th>
          <th>Audio Codec</th>
          <th>Size</th>
          <th>Download</th>
        </tr>
      );

      bothRows = bothData.map((data, i) => (
        <tr key={i}>
          <td>{data.resolution}</td>
          <td>.{data.mime_type.replace('video/', '')}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a className="snapper-button youtube-button" target="_blank" rel="noopener noreferrer" href={data.url}>
              Download
            </a>
          </td>
        </tr>
      ));

      bothTable = (
        <div style={{ overflowX: 'auto' }}>
          <table className="youtube-table">
            <thead>{bothTopRow}</thead>
            <tbody>{bothRows}</tbody>
          </table>
        </div>
      );

      audioHeader = (
        <div>
          <h3 className="youtube-title">Download Audio Only</h3>
        </div>
      );

      audioTopRow = (
        <tr>
          <th>Bit Rate</th>
          <th>Audio Codec</th>
          <th>Size</th>
          <th>Download</th>
        </tr>
      );

      audioRows = audioData.map((data, i) => (
        <tr key={i}>
          <td>{data.abr}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a className="snapper-button youtube-button" target="_blank" rel="noopener noreferrer" href={data.url}>
              Download
            </a>
          </td>
        </tr>
      ));

      audioTable = (
        <div style={{ overflowX: 'auto' }}>
          <table className="youtube-table">
            <thead>{audioTopRow}</thead>
            <tbody>{audioRows}</tbody>
          </table>
        </div>
      );

      videoHeader = (
        <div>
          <h3 className="youtube-title">Download Video Only</h3>
        </div>
      );

      videoTopRow = (
        <tr>
          <th>Quality</th>
          <th>Type</th>
          <th>Size</th>
          <th>Download</th>
        </tr>
      );

      videoRows = videoData.map((data, i) => (
        <tr key={i}>
          <td>{data.resolution || 'Unknown'}</td>
          <td>.{data.mime_type.replace('video/', '')}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a className="snapper-button youtube-button" target="_blank" rel="noopener noreferrer" href={data.url}>
              Download
            </a>
          </td>
        </tr>
      ));

      videoTable = (
        <div style={{ overflowX: 'auto' }}>
          <table className="youtube-table">
            <thead>{videoTopRow}</thead>
            <tbody>{videoRows}</tbody>
          </table>
        </div>
      );
    }

    let youtubeDemo = (
      <div>
        <p className="url-tip">
          Your URL should look like this:{' '}
          <a
            href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
            style={{ color: 'rgb(228, 55, 37)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.youtube.com/watch?v=a3lcGnMhvsA
          </a>
        </p>
        <p className="url-tip">This tab is for downloading Youtube videos and shows all available formats.</p>
        <button onClick={this.handleDemo} className="snapper-button">
          Try it out!
        </button>
      </div>
    );

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

          <div>{this.state.youtubeDemo ? youtubeDemo : ''}</div>
        </form>

        <div className="youtube-download-container">
          {youtubeWarning ? youtubeWarningMessage : ''}
          {displayYoutubeLoading ? youtubeLoader : ''}

          {youtubeErrorState ? youtubeErrorMessage : ''}

          {displayYoutubeResults ? youtubeHeader : ''}
          {displayYoutubeResults ? youtubeHighest : ''}

          {displayYoutubeResults ? bothHeader : ''}
          {displayYoutubeResults ? bothTable : ''}

          {displayYoutubeResults ? audioHeader : ''}
          {displayYoutubeResults ? audioTable : ''}

          {displayYoutubeResults ? videoHeader : ''}
          {displayYoutubeResults ? videoTable : ''}
        </div>
      </>
    );
  }
}

export default Youtube;
