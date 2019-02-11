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

  render() {
    const { instagramLinks } = this.state;

    const instagramBlocks = instagramLinks.map((insta, i) => (
      <li key={i}>
        {insta.includes('.mp4') ? (
          <div>
            <video key={insta} width="200px" controls>
              <source src={insta} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={insta}>
              Download
            </a>
          </div>
        ) : (
          <div>
            <img alt="instagram pic" style={{ width: '200px' }} src={insta} />
            <br />
            <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={insta}>
              Download
            </a>
          </div>
        )}
      </li>
    ));

    return (
      <>
        {/* instagram panel */}

        <p>Example instagram url: https://www.instagram.com/p/Bpno2Z5AUNe/</p>
        <form id="instagramForm" className="meme-form" onSubmit={this.handleInstagram}>
          <input type="text" name="instagramURLinput" placeholder="Instagram URL" onChange={this.handleChange} />
          <button>Instagram</button>
        </form>

        <div>
          <ul>
            {instagramLinks.map((insta, i) => (
              <li key={i}>
                <a target="_blank" rel="noopener noreferrer" href={insta}>
                  {insta}
                </a>
              </li>
            ))}
            {instagramBlocks}
          </ul>
        </div>
      </>
    );
  }
}

export default Instagram;
