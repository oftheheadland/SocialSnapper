import React, { Component } from 'react';

import 'react-tabs/style/react-tabs.css';

class Reddit extends Component {
  constructor() {
    super();
    this.state = {
      redditVideo: '',
      redditAudio: '',
      redditURLinput: '',
      redditReady: false,
      redditLoading: false,
      encodedVideo: '',
      encodedAudio: '',
      redditTitle: '',
      redditThumbnail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReddit = this.handleReddit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // REDDIT
  handleReddit(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.redditURLinput && !this.state.redditLoading) {
      console.log('searching...');
      this.setState({ redditLoading: true });
      this.setState({ redditReady: true });

      let url = 'https://conversion-api-test.herokuapp.com/redditAPI';
      let redditURL = this.state.redditURLinput;

      let formData = new FormData(); // Build formData object.
      formData.append('redditURL', redditURL);

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
          console.log(jsonData);
          that.setState({ redditVideo: jsonData['video'] });
          that.setState({ redditAudio: jsonData['audio'] });
          that.setState({ redditTitle: jsonData['title'] });
          that.setState({ redditThumbnail: jsonData['thumbnail'] });
          that.setState({ redditReady: true });
          that.setState({ redditLoading: false });
          that.setState({ encodedVideo: btoa(jsonData['video']) });
          that.setState({ encodedAudio: btoa(jsonData['audio']) });
        })
        .catch((error) => console.error('Error:', error));
    }
  }

  render() {
    const displayRedditResults = this.state.redditReady;
    const displayRedditLoading = this.state.redditLoading;

    var redditDownloads = (
      <div className="download-container">
        <h2>{this.state.redditTitle}</h2>

        {this.state.redditThumbnail ? (
          <div>
            <br />
            <img className="redditThumbnail" alt="reddit thumbnail" src={this.state.redditThumbnail} />
          </div>
        ) : (
          ''
        )}

        <hr />

        <div>
          <video style={{ display: 'none' }} key={this.state.redditVideo} width="300px" controls>
            <source src={this.state.redditVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <p>
          <strong>
            Download video with audio: <br />{' '}
          </strong>
          <a
            className="reddit-button"
            target="_blank"
            rel="noopener noreferrer"
            href={
              'https://combinefiles.netlify.com/demo/?video=' +
              this.state.encodedVideo +
              '&audio=' +
              this.state.encodedAudio
            }
          >
            Download
          </a>
        </p>

        <p>
          Download video only: <br />{' '}
          <a className="reddit-button" target="_blank" rel="noopener noreferrer" href={this.state.redditVideo}>
            Download
          </a>
        </p>
        <div />

        <p style={{ display: 'none' }}>
          Download audio only: <br />
          <a className="reddit-button" target="_blank" rel="noopener noreferrer" href={this.state.redditAudio}>
            Download
          </a>
        </p>
      </div>
    );

    if (displayRedditLoading) {
      // display loading animation
      redditDownloads = (
        <div className="download-container">
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    } else if (!this.state.redditTitle) {
      // display error message
      redditDownloads = <div className="download-container">Error. Make sure this is a v.reddit video.</div>;
    }

    const redditWelcome = <div>Welcome this will only appear until they search! Explain how it works</div>;

    return (
      <>
        {/* TODO: https://reactcommunity.org/react-tabs/ style and color the tabs, generate them. only 3 so maybe no necessary to generate but at least style them 
    and give them icons don't use trademarked icons */}

        {/* <p>Example reddit url: https://www.reddit.com/r/oddlysatisfying/comments/an4bc2/this_axe_getting_restored/</p> */}
        <form id="redditForm" className="meme-form" onSubmit={this.handleReddit}>
          <input type="text" name="redditURLinput" placeholder="Reddit Video URL" onChange={this.handleChange} />
          <button>Reddit</button>
        </form>

        {displayRedditResults ? redditDownloads : redditWelcome}
      </>
    );
  }
}

export default Reddit;
