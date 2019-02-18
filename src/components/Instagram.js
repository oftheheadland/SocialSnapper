import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';

import Loading from './Loading';

class Instagram extends Component {
  constructor() {
    super();
    this.state = {
      instagramLinks: [], // holds array of instagram image and video links
      instagramURL: '', // holds value of instagram search input
      instagramLoading: false, // when true displays loading animation
      instagramError: false, // when true displays error message
      instagramDemo: true, // when true, shows the "Try it out" button
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInstagram = this.handleInstagram.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDemo(event) {
    event.preventDefault();
    console.log('hello');

    if (!this.state.instagramLoading) {
      this.setState({ instagramDemo: false });
      this.setState({ instagramLoading: true });
      this.setState({ instagramError: false });
      this.setState({ instagramLinks: [] });

      console.log('in instagram event');

      let url = 'https://conversion-api-test.herokuapp.com/instagramAPI';
      let instagramURL = 'https://www.instagram.com/p/Bs8qUvrhYBj/';

      // sanitize user input; remove empty spaces
      let cleanInstagramURL = instagramURL.split(' ').join('');

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
          console.log(response.status);
          if (response.status !== 200) {
            that.setState({ instagramError: true });
            console.log('ran into an error with instagram');
            that.setState({ instagramLoading: false });
            apiFailed = true;
          } else {
            return response.json();
          }
        })
        .then(function(jsonData) {
          if (!apiFailed) {
            console.log(jsonData);
            that.setState({ instagramLinks: jsonData['links'] });
            that.setState({ instagramLoading: false });
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  }

  handleInstagram(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    if (this.state.instagramURLinput && !this.state.instagramLoading) {
      this.setState({ instagramDemo: false });
      this.setState({ instagramLoading: true });
      this.setState({ instagramError: false });
      this.setState({ instagramLinks: [] });

      console.log('in instagram event');

      let url = 'https://conversion-api-test.herokuapp.com/instagramAPI';
      let instagramURL = this.state.instagramURLinput;

      // sanitize user input; remove empty spaces
      let cleanInstagramURL = instagramURL.split(' ').join('');

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
          console.log(response.status);
          if (response.status !== 200) {
            that.setState({ instagramError: true });
            console.log('ran into an error with instagram');
            that.setState({ instagramLoading: false });
            apiFailed = true;
          } else {
            return response.json();
          }
        })
        .then(function(jsonData) {
          if (!apiFailed) {
            console.log(jsonData);
            that.setState({ instagramLinks: jsonData['links'] });
            that.setState({ instagramLoading: false });
          }
        })
        .catch((error) => console.error('Error:', error));
    }
  }
  render() {
    const instagramLinks = this.state.instagramLinks;

    const instagramLoader = <Loading />;

    const instagramBlocks = instagramLinks.map((insta, i) => (
      <div key={i}>
        <div className="instagramCol">
          {insta.includes('.mp4') ? (
            <div className="video-spacer">
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
          <a className="snapper-button" target="_blank" rel="noopener noreferrer" href={insta}>
            Download
          </a>
        </div>
      </div>
    ));
    let instaDemo = (
      <div>
        <p className="url-tip">
          Your URL should look like this:{' '}
          <a
            href="https://www.instagram.com/p/Bs8qUvrhYBj/"
            style={{ color: 'rgb(228, 55, 37)' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.instagram.com/p/Bs8qUvrhYBj/
          </a>
        </p>
        <p className="url-tip">
          This tab is for downloading Instagram posts. Works on any type of post including photos, videos, and albums.
        </p>
        <button onClick={this.handleDemo} className="snapper-button">
          Try it out!
        </button>
      </div>
    );

    return (
      <>
        <form id="instagramForm" className="snapper-form" onSubmit={this.handleInstagram}>
          <input
            className="snapper-input"
            type="text"
            name="instagramURLinput"
            placeholder="Instagram Post URL"
            onChange={this.handleChange}
          />
          <button className="snapper-button">Snap</button>

          <div>{this.state.instagramDemo ? instaDemo : ''}</div>
        </form>

        <div className="insta-download-container">
          {this.state.instagramError ? (
            <div className="error-message">Error with your search. Please use an instagram post URL.</div>
          ) : (
            ''
          )}
          {this.state.instagramLoading ? instagramLoader : ''}
          <div className="insta-flex-container">{instagramBlocks}</div>
        </div>
      </>
    );
  }
}

export default Instagram;
