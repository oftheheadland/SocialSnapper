import React, { Component } from 'react';

import 'react-tabs/style/react-tabs.css';

class Youtube extends Component {
  constructor() {
    super();
    this.state = {
      youtubeData: {},
      youtubeReady: false,
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
        that.setState({ youtubeData: jsonData });
        that.setState({ youtubeReady: true });
      })
      .catch((error) => console.error('Error:', error));
  }

  render() {
    const displayYoutubeResults = this.state.youtubeReady;

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
            alt="instagram pic"
            style={{ width: '400px' }}
            src={generalData[0]['thumbnail'].replace('default', 'hqdefault')}
          />
          {/* test{console.log(data)} */}
          {/* <img alt="instagram pic" style={{ width: '200px' }} src="test" />
          <br />
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href="test">
            Download
          </a> */}
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
        <p>Example youtube url: https://www.youtube.com/watch?v=pvrc0UenwKk&t=0s</p>
        <form id="youtubeForm" className="meme-form" onSubmit={this.handleYoutube}>
          <input type="text" name="youtubeURLinput" placeholder="Youtube Video URL" onChange={this.handleChange} />
          <button>Reddit</button>
        </form>
        {displayYoutubeResults ? youtubeHeader : ''}
        {displayYoutubeResults ? bothHeader : ''}
        {displayYoutubeResults ? bothBlocks : ''}

        {displayYoutubeResults ? audioHeader : ''}
        {displayYoutubeResults ? audioBlocks : ''}

        {displayYoutubeResults ? videoHeader : ''}
        {displayYoutubeResults ? videoBlocks : ''}
      </>
    );
  }
}

export default Youtube;
