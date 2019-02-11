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
      console.log(audioData);

      const bothData = youtubeData['both'];
      //   console.log(bothData);

      const videoData = youtubeData['video'];
      //   console.log(videoData);

      const generalData = youtubeData['general'];
      console.log(generalData);

      const test = this.state.youtubeURLinput;

      //   youtubeHeader = generalData.map((data, i) => (
      //     <div key={i}>
      //       <a href={data.url}>test</a>
      //       test{console.log(data)}
      //       <img alt="instagram pic" style={{ width: '200px' }} src="test" />
      //       <br />
      //       <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href="test">
      //         Download
      //       </a>
      //     </div>
      //   ));

      youtubeHeader = (
        <div>
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

      videoHeader = <h2>video links</h2>;
      videoBlocks = videoData.map((data, i) => (
        <div key={i}>
          {/* test{console.log(data)} */}
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={data.url}>
            Download
          </a>
        </div>
      ));

      bothHeader = <h2>both links</h2>;
      bothBlocks = bothData.map((data, i) => (
        <div key={i}>
          {/* test{console.log(data)} */}
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={data.url}>
            Download
          </a>
        </div>
      ));

      audioHeader = <h2>audio links</h2>;
      audioBlocks = audioData.map((data, i) => (
        <div key={i}>
          test{console.log(data)}
          <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={data.url}>
            Download
          </a>
        </div>
      ));
    }

    // const youtubeBlocks = 'hello';

    // console.log(youtubeData['youtube']['audio']);

    // const youtubeBlocks = this.state.youtubeData.audio.map(
    //   (youtubeData, i) => console.log(youtubeData),
    //     <li key={i}>
    //       {insta.includes('.mp4') ? (
    //         <div>
    //           <video key={insta} width="200px" controls>
    //             <source src={insta} type="video/mp4" />
    //             Your browser does not support the video tag.
    //           </video>
    //           <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={insta}>
    //             Download
    //           </a>
    //         </div>
    //       ) : (
    //         <div>
    //           <img alt="instagram pic" style={{ width: '200px' }} src={insta} />
    //           <br />
    //           <a className="btn btn-success" target="_blank" rel="noopener noreferrer" href={insta}>
    //             Download
    //           </a>
    //         </div>
    //       )}
    //     </li>
    // );

    return (
      <>
        <p>Example youtube url: https://www.youtube.com/watch?v=pvrc0UenwKk&t=0s</p>
        <form id="youtubeForm" className="meme-form" onSubmit={this.handleYoutube}>
          <input type="text" name="youtubeURLinput" placeholder="Youtube Video URL" onChange={this.handleChange} />
          <button>Reddit</button>
        </form>
        {displayYoutubeResults ? youtubeHeader : ''}
        {displayYoutubeResults ? audioHeader : ''}
        {displayYoutubeResults ? audioBlocks : ''}

        {displayYoutubeResults ? videoHeader : ''}
        {displayYoutubeResults ? videoBlocks : ''}

        {displayYoutubeResults ? bothHeader : ''}
        {displayYoutubeResults ? bothBlocks : ''}
      </>
    );
  }
}

export default Youtube;
