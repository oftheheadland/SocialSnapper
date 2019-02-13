import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';

class Instagram extends Component {
  constructor() {
    super();
    this.state = {
      instagramLinks: [],
      instagramURL: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInstagram = this.handleInstagram.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // INSTAGRAM
  handleInstagram(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.instagramURLinput) {
      console.log('in instagram event');

      let url = 'https://conversion-api-test.herokuapp.com/instagramAPI';
      let instagramURL = this.state.instagramURLinput;

      // Build formData object.
      let formData = new FormData();
      formData.append('instagramURL', instagramURL);

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
          that.setState({ instagramLinks: jsonData['links'] });
        })
        .catch((error) => console.error('Error:', error));
    }
  }
  render() {
    const { instagramLinks } = this.state;

    // const instagramBlocks = instagramLinks.map((insta, i) => (
    //   <div key={i}>
    //     {insta.includes('.mp4') ? (
    //       <div className="col-md-4 instagramCol">
    //         <video key={insta} width="100%" controls>
    //           <source src={insta} type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //         <br />
    //         <a className="btn btn-success instaVideoButton" target="_blank" rel="noopener noreferrer" href={insta}>
    //           Download
    //         </a>
    //       </div>
    //     ) : (
    //       <div className="col-md-4 instagramCol">
    //         <img alt="instagram pic" style={{ width: '100%' }} src={insta} />
    //         <br />
    //         <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={insta}>
    //           Download
    //         </a>
    //       </div>
    //     )}
    //   </div>
    // ));

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
          <p style={{ fontSize: '14px', color: '#525252', marginTop: '20px', wordBreak: 'break-all' }}>
            Your URL should like this:{' '}
            <span style={{ color: '#525252' }}>https://www.instagram.com/p/Bs8qUvrhYBj/</span>
          </p>
        </form>
        <div className="insta-download-container">
          <div className="insta-flex-container">{instagramBlocks}</div>
        </div>
      </>
    );
  }
}

export default Instagram;
