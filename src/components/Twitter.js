import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import Popup from 'react-popup';
import 'react-tabs/style/react-tabs.css';
import SadMessage from './SadMessage';

import Loading from './Loading';

class Twitter extends Component {
  constructor() {
    super();
    this.state = {
      twitterLinks: [], // holds array of twitter image and video links
      twitterURLinput: '', // holds value of twitter search input
      twitterLoading: false, // when true displays loading animation
      twitterError: false, // when true displays error message
      twitterDemo: true, // when true, shows the "Try it out" button
      twitterReady: false, //holds whether demo should be shown or not
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInstagram = this.handleInstagram.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({ twitterDemo: true });
    this.setState({ twitterReady: false });
    this.setState({ twitterError: false });
    document.getElementById('twitterURLinput').value = '';
    this.setState({ twitterURLinput: '' });
  }

  handleDemo(event) {
    event.preventDefault();

    if (!this.state.twitterLoading) {
      this.setState({ twitterDemo: false });
      this.setState({ twitterReady: false });
      this.setState({ twitterLoading: true });
      this.setState({ twitterError: false });
      this.setState({ twitterLinks: [] });

      // https://pbs.twimg.com/media/D3WTwomV4AAwSHD?format=jpg&name=medium
      // https://pbs.twimg.com/media/D3WTwokUEAA2Iif?format=jpg&name=medium

      const demoLinks = [
        'https://pbs.twimg.com/media/D3WTwomV4AAwSHD?format=jpg&name=medium',
        'https://pbs.twimg.com/media/D3WTwokUEAA2Iif?format=jpg&name=medium',
      ];
      this.setState({ twitterLinks: demoLinks });
      this.setState({ twitterLoading: false });
      this.setState({ twitterReady: true });
      this.setState({
        twitterURLinput:
          'https://twitter.com/dog_rates/status/1113958952079749121',
      });
    }
  }

  handleInstagram(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    if (this.state.twitterURLinput && !this.state.twitterLoading) {
      this.setState({ twitterDemo: false });
      this.setState({ twitterReady: false });
      this.setState({ twitterLoading: true });
      this.setState({ twitterError: false });
      this.setState({ twitterLinks: [] });

      let url = 'https://snapperapi.herokuapp.com/twitterAPI';
      let twitterURL = this.state.twitterURLinput;

      // sanitize user input; remove empty spaces
      let cleanInstagramURL = twitterURL.split(' ').join('');

      // Build formData object.
      let formData = new FormData();
      formData.append('twitterURL', cleanInstagramURL);

      const that = this;
      let apiFailed = false;
      // fetch from api
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(function(response) {
          if (response.status !== 200) {
            that.setState({ twitterError: true });
            that.setState({ twitterLoading: false });
            apiFailed = true;
          } else {
            return response.json();
          }
        })
        .then(function(jsonData) {
          if (!apiFailed) {
            that.setState({ twitterLinks: jsonData['links'] });
            that.setState({ twitterLoading: false });
            that.setState({ twitterReady: true });
          }
        })
        .catch((error) => console.error('Error:', error));
    } else if (!this.state.twitterLoading) {
      Popup.alert('Please enter a URL.');
    }
  }

  render() {
    // IE11 compatability because it somehow still has 10% market share
    if (!String.prototype.includes) {
      // eslint-disable-next-line
      String.prototype.includes = function(search, start) {
        if (typeof start !== 'number') {
          start = 0;
        }

        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
      };
    }

    // const twitterLinks = this.state.twitterLinks;

    const resetButton = (
      <button
        className="reset-button reset-button-insta"
        onClick={this.handleReset}
      >
        <i className="fas fa-times" />
      </button>
    );

    const twitterBlocks = this.state.twitterLinks.map((insta, i) => (
      <FadeIn key={i}>
        <div className="twitterCol">
          <div>
            <img alt="twitter pic" style={{ width: '100%' }} src={insta} />
          </div>

          <hr />
          <a
            className="snapper-button"
            target="_blank"
            rel="noopener noreferrer"
            href={insta}
          >
            Download
          </a>
        </div>
      </FadeIn>
    ));
    let instaDemo = (
      <div>
        {/* <p className="url-tip">
          Your URL should look like this:{' '}
          <a
            href="https://twitter.com/dog_rates/status/1113958952079749121"
            className="snapper-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://twitter.com/dog_rates/status/1113958952079749121
          </a>
        </p> */}
        <p className="url-tip">
          Here you can download all of the <strong>images</strong> from a Tweet.
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
        <form className="snapper-form" onSubmit={this.handleInstagram}>
          <div className="input-group snapper-form-div">
            <Popup />
            {/* <input
              className="snapper-input"
              type="text"
              id="twitterURLinput"
              name="twitterURLinput"
              placeholder="Twitter Post URL"
              onChange={this.handleChange}
              value={this.state.twitterURLinput}
            />
            <button className="snapper-button search-button">
              <i className="fas fa-search" />
            </button> */}
            <SadMessage url="https://twitter.com" />
          </div>

          <div>{this.state.twitterDemo ? instaDemo : ''}</div>
        </form>

        <div className="insta-download-container">
          {this.state.twitterReady ? <>{resetButton}</> : ''}

          {this.state.twitterError ? (
            <>
              {resetButton}
              <div className="error-message">
                Error with your search. Please use a tweet with images in it.
                <br /> Your URL should look like this:{' '}
                <a
                  href="https://www.twitter.com/p/Bs8qUvrhYBj/"
                  className="snapper-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.twitter.com/p/Bs8qUvrhYBj/
                </a>
              </div>
            </>
          ) : (
            ''
          )}
          {this.state.twitterLoading ? <Loading /> : ''}

          {this.state.twitterReady ? (
            <>
              <p className="demo-link">
                <a
                  href={this.state.twitterURLinput}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.twitterURLinput}
                </a>
              </p>
              <div className="insta-flex-container twitter-flex-container">
                {twitterBlocks}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </FadeIn>
    );
  }
}

export default Twitter;
