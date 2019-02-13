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
      <div className="reddit-download-container">
        <div className="reddit-flex-container">
          <div className="reddit-download-flex">
            <h3>{this.state.redditTitle}</h3>

            {this.state.redditThumbnail ? (
              <div>
                <br />
                <img className="redditThumbnail" alt="reddit thumbnail" src={this.state.redditThumbnail} />
              </div>
            ) : (
              ''
            )}
          </div>

          <>
            <video style={{ display: 'none' }} key={this.state.redditVideo} width="300px" controls>
              <source src={this.state.redditVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>

          <div className="reddit-download-flex">
            <p>
              Download video with audio <br />{' '}
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
            <hr />
            <p>
              Download video only <br />{' '}
              <a className="snapper-button" target="_blank" rel="noopener noreferrer" href={this.state.redditVideo}>
                Download
              </a>
            </p>

            <p style={{ display: 'none' }}>
              Download audio only <br />
              <a className="snapper-button" target="_blank" rel="noopener noreferrer" href={this.state.redditAudio}>
                Download
              </a>
            </p>
          </div>
        </div>
      </div>
    );

    if (displayRedditLoading) {
      // display loading animation
      redditDownloads = (
        <div className="reddit-download-container">
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
      redditDownloads = <div className="reddit-download-container">Error. Make sure this is a v.reddit video.</div>;
    }

    const redditWelcome = '';
    //   <div className="reddit-download-container">
    //     <p>Welcome! Explain how it works here.</p>
    //     <p>
    //       Click a tab above to switch to a different social media website search. Use the URL for the post containing
    //       the content you would like to archive.
    //     </p>
    //   </div>

    return (
      <>
        <form className="snapper-form" onSubmit={this.handleReddit}>
          <input
            className="snapper-input"
            type="text"
            name="redditURLinput"
            placeholder="Reddit Post URL"
            onChange={this.handleChange}
          />
          <button className="snapper-button">Snap</button>
          <p style={{ fontSize: '14px', color: '#525252', marginTop: '20px', wordBreak: 'break-all' }}>
            Your URL should like this:{' '}
            <span style={{ color: '#525252' }}>
              https://www.reddit.com/r/dogswithjobs/comments/aq1gyn/this_pup_greets_the_mailman_every_day_to_get_the/
            </span>
          </p>
        </form>

        {displayRedditResults ? redditDownloads : redditWelcome}
      </>
    );
  }
}

export default Reddit;
