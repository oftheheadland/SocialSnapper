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
        this.setState({ youtubeData: '' });
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
    const youtubeWarningMessage = (
      <div style={{ textAlign: 'center', padding: '20px' }}>Playlists are not currently supported.</div>
    );

    const youtubeErrorState = this.state.youtubeError;
    const youtubeErrorMessage = (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        There was an error with your request. Try again or use a different video.
      </div>
    );

    const displayYoutubeLoading = this.state.youtubeLoading;

    const youtubeLoader = (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );

    let youtubeWarning = this.state.youtubeWarning;

    const youtubeData = this.state.youtubeData['youtube'];
    console.log(youtubeData);

    let youtubeHeader;

    let audioHeader;
    let audioTopRow;
    let audioBlocks;

    let videoHeader;
    let videoTopRow;
    let videoBlocks;

    let bothHeader;
    let bothTopRow;
    let bothRows;

    if (youtubeData !== undefined) {
      const audioData = youtubeData['audio'];
      const bothData = youtubeData['both'];
      const videoData = youtubeData['video'];

      const generalData = youtubeData['general'];
      console.log(generalData);

      youtubeHeader = (
        <div className="youtube-header">
          {/* <p>
            ***To download, right-click on the download button (or tap and hold if using mobile) and choose the
            Save/Download option.***
          </p> */}
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
          <h3 className="youtube-header">Download Video with Audio</h3>
        </div>
      );

      bothTopRow = (
        <tr>
          <th>Quality</th>
          <th>Type</th>
          <th>Size</th>
          <th>Download</th>
        </tr>
      );

      bothRows = bothData.map((data, i) => (
        <tr key={i}>
          <td>{data.resolution}</td>
          <td>.{data.mime_type.replace('video/', '')}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a className="snapper-button" target="_blank" rel="noopener noreferrer" href={data.url}>
              Download
            </a>
          </td>
        </tr>
      ));

      audioHeader = (
        <div>
          <h3 className="youtube-header">Download Audio Only</h3>
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

      audioBlocks = audioData.map((data, i) => (
        <tr key={i}>
          <td>{data.abr}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a className="snapper-button" target="_blank" rel="noopener noreferrer" href={data.url}>
              Download
            </a>
          </td>
        </tr>
      ));

      videoHeader = (
        <div>
          <h3 className="youtube-header">Download Video Only</h3>
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

      videoBlocks = videoData.map((data, i) => (
        <tr key={i}>
          <td>{data.resolution}</td>
          <td>.{data.mime_type.replace('video/', '')}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a className="snapper-button" target="_blank" rel="noopener noreferrer" href={data.url}>
              Download
            </a>
          </td>
        </tr>
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
          <p style={{ fontSize: '14px', color: 'black', marginTop: '20px', wordBreak: 'break-all' }}>
            Your URL should look like this:{' '}
            <a
              href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
              style={{ color: '#777777' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.youtube.com/watch?v=a3lcGnMhvsA
            </a>
          </p>
        </form>

        <div className="youtube-download-container">
          {youtubeWarning ? youtubeWarningMessage : ''}
          {displayYoutubeLoading ? youtubeLoader : ''}

          {youtubeErrorState ? youtubeErrorMessage : ''}

          {displayYoutubeResults ? youtubeHeader : ''}
          {displayYoutubeResults ? bothHeader : ''}
          {displayYoutubeResults ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="youtube-table">
                <thead>{bothTopRow}</thead>
                <tbody>{bothRows}</tbody>
              </table>
            </div>
          ) : (
            ''
          )}

          {displayYoutubeResults ? audioHeader : ''}
          {displayYoutubeResults ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="youtube-table">
                <thead>{audioTopRow}</thead>
                <tbody>{audioBlocks}</tbody>
              </table>
            </div>
          ) : (
            ''
          )}

          {displayYoutubeResults ? videoHeader : ''}
          {displayYoutubeResults ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="youtube-table">
                <thead>{videoTopRow}</thead>
                <tbody>{videoBlocks}</tbody>
              </table>
            </div>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

export default Youtube;
