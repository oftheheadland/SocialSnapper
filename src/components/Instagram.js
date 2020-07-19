import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import Popup from 'react-popup';
import 'react-tabs/style/react-tabs.css';

import Loading from './Loading';

class Instagram extends Component {
  constructor() {
    super();
    this.state = {
      instagramLinks: [], // holds array of instagram image and video links
      instagramURLinput: '', // holds value of instagram search input
      instagramLoading: false, // when true displays loading animation
      instagramError: false, // when true displays error message
      instagramDemo: true, // when true, shows the "Try it out" button
      instagramReady: false, //holds whether demo should be shown or not
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
    this.setState({ instagramDemo: true });
    this.setState({ instagramReady: false });
    this.setState({ instagramError: false });
    document.getElementById('instagramURLinput').value = '';
    this.setState({ instagramURLinput: '' });
  }

  handleDemo(event) {
    event.preventDefault();

    if (!this.state.instagramLoading) {
      this.setState({ instagramDemo: false });
      this.setState({ instagramReady: true });
      this.setState({ instagramLoading: false });
      this.setState({ instagramError: false });
      this.setState({
        instagramURLinput: 'https://www.instagram.com/p/Bs8qUvrhYBj/',
      });
      this.setState({
        instagramLinks: [
          'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/50324653_229452851340964_8861587818712193897_n.jpg?_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=15OTYoVNxUAAX-Ti9vN&oh=4537452aa7162590a38b5f983bf2d5aa&oe=5F3CC65B',
          'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/49555951_141955066709002_8821930970154665631_n.jpg?_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=X_cdMbyie2AAX8qjpbl&oh=b12854d0fd7d335b427a06a0bf373102&oe=5F3CDA21',
          'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/50032352_284698842221250_8243911729013016769_n.jpg?_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=sQb5GoxYxksAX9WmSoI&oh=d00a3111b587e4119397d148e2193416&oe=5F3AF2D8',
          'https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/46336967_248621159393381_4664381489986124221_n.jpg?_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=3xBKB_DveqAAX_V4NHi&oh=d0c7c48a23cde56a1c535bcbffd88b62&oe=5F3E5394',
        ],
      });
    }
  }

  handleInstagram(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    if (this.state.instagramURLinput && !this.state.instagramLoading) {
      this.setState({ instagramDemo: false });
      this.setState({ instagramReady: false });
      this.setState({ instagramLoading: true });
      this.setState({ instagramError: false });
      this.setState({ instagramLinks: [] });

      let url = 'https://snapperapi.herokuapp.com/instagramAPI';
      let instagramURL = this.state.instagramURLinput;

      // sanitize user input; remove empty spaces
      let cleanInstagramURL = instagramURL.split(' ').join('');

      if (cleanInstagramURL.includes('/tv/')) {
        cleanInstagramURL = cleanInstagramURL.replace('/tv/', '/p/');
      }

      // Build formData object.
      let formData = new FormData();
      formData.append('instagramURL', cleanInstagramURL);

      const that = this;
      let apiFailed = false;
      // fetch from api
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(function(response) {
          if (response.status !== 200) {
            that.setState({ instagramError: true });
            that.setState({ instagramLoading: false });
            apiFailed = true;
          } else {
            return response.json();
          }
        })
        .then(function(jsonData) {
          if (!apiFailed) {
            that.setState({ instagramLinks: jsonData['links'] });
            that.setState({ instagramLoading: false });
            that.setState({ instagramReady: true });
          }
        })
        .catch((error) => console.error('Error:', error));
    } else if (!this.state.instagramLoading) {
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

    const resetButton = (
      <button
        className="reset-button reset-button-insta"
        onClick={this.handleReset}
      >
        <i className="fas fa-times" />
      </button>
    );

    const instagramBlocks = this.state.instagramLinks.map((insta, i) => (
      <FadeIn key={i}>
        <div className="instagramCol">
          {insta.includes('mp4') ? (
            <div>
              <video key={insta} width="100%" controls>
                <source src={insta} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div>
              <img alt="instagram pic" style={{ width: '100%' }} src={insta} />
            </div>
          )}

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
        <p className="url-tip">
          Your URL should look like this:{' '}
          <a
            href="https://www.instagram.com/p/Bs8qUvrhYBj/"
            className="snapper-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.instagram.com/p/Bs8qUvrhYBj/
          </a>
        </p>
        <p className="url-tip">
          Here you can download Instagram Posts, Highlights, Stories, and
          Profile Pictures.
        </p>
        <button onClick={this.handleDemo} className="snapper-button">
          View Example <i className="fas fa-angle-double-right" />
        </button>
      </div>
    );

    return (
      <FadeIn>
        <form className="snapper-form" onSubmit={this.handleInstagram}>
          <div className="input-group snapper-form-div">
            <Popup />
            <input
              className="snapper-input"
              type="text"
              id="instagramURLinput"
              name="instagramURLinput"
              placeholder="Instagram Post URL"
              onChange={this.handleChange}
            />
            <button className="snapper-button search-button">
              <i className="fas fa-search" />
            </button>
          </div>

          <div>{this.state.instagramDemo ? instaDemo : ''}</div>
        </form>

        <div className="insta-download-container">
          {this.state.instagramReady ? <>{resetButton}</> : ''}

          {this.state.instagramError ? (
            <>
              {resetButton}
              <div className="error-message">
                Error with your search. Please use an instagram post or story
                URL.
                <br /> Your URL should look like this:{' '}
                <a
                  href="https://www.instagram.com/p/Bs8qUvrhYBj/"
                  className="snapper-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.instagram.com/p/Bs8qUvrhYBj/
                </a>
              </div>
            </>
          ) : (
            ''
          )}
          {this.state.instagramLoading ? <Loading /> : ''}

          {this.state.instagramReady ? (
            <>
              <p className="demo-link">
                <a
                  href={this.state.instagramURLinput}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.instagramURLinput}
                </a>
              </p>
              <div className="insta-flex-container">{instagramBlocks}</div>
            </>
          ) : (
            ''
          )}
        </div>
      </FadeIn>
    );
  }
}

export default Instagram;
