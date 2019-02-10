import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Reddit from './Reddit';

class MediaFetcher extends Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
      //   redditVideo: 'reddit video placeholder',
      //   redditAudio: 'reddit audio placeholder',
      //   redditURLinput: '',
      instagramLinks: [],
      instagramURL: 'instagram url',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleReddit = this.handleReddit.bind(this);
    this.handleInstagram = this.handleInstagram.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  // REDDIT
  handleReddit(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    let url = 'https://conversion-api-test.herokuapp.com/redditAPI';
    let redditURL = this.state.redditURLinput;

    // Build formData object.
    let formData = new FormData();
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
      })
      .catch((error) => console.error('Error:', error));

    this.setState({ redditVideo: 'loading...' });
    this.setState({ redditAudio: 'loading...' });
  }

  //   handleRedditCombine(event) {
  //     event.preventDefault(); //prevent from reloading the page on submit

  //     let url = 'https://conversion-api-test.herokuapp.com/redditCombine';
  //     // let redditURL = this.state.redditURLinput;
  //     let redditURL = 'https://www.reddit.com/r/gifs/comments/anijmn/cat_gets_it_tongue_stuck_on_blanket/';

  //     // Build formData object.
  //     let formData = new FormData();
  //     formData.append('redditURL', redditURL);

  //     const that = this;

  //     // fetch from api
  //     fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then(function(response) {
  //         return response.json();
  //       })
  //       .then(function(jsonData) {
  //         console.log(jsonData);
  //         // that.setState({ redditCombine: jsonData});
  //       })
  //       .catch((error) => console.error('Error:', error));
  //   }

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
      <div className="outer-container">
        {/* TODO: https://reactcommunity.org/react-tabs/ style and color the tabs, generate them. only 3 so maybe no necessary to generate but at least style them 
    and give them icons don't use trademarked icons */}

        <Tabs>
          <TabList>
            <Tab>Reddit</Tab>
            <Tab>Instagram</Tab>
            <Tab>Meme gen</Tab>
          </TabList>

          {/* reddit tab */}
          <TabPanel>
            <Reddit />
            {/* <p>
              Example reddit url: https://www.reddit.com/r/oddlysatisfying/comments/an4bc2/this_axe_getting_restored/
            </p>
            <form id="redditForm" className="meme-form" onSubmit={this.handleReddit}>
              <input type="text" name="redditURLinput" placeholder="Reddit Video URL" onChange={this.handleChange} />
              <button>Reddit</button>
            </form>
            <div>
              <h2 className="top">
                <a target="_blank" rel="noopener noreferrer" href={this.state.redditVideo}>
                  Video Link
                </a>
              </h2>
              <h2 className="bottom">
                <a target="_blank" rel="noopener noreferrer" href={this.state.redditAudio}>
                  Audio Link
                </a>
              </h2>
              <button onClick={this.handleRedditCombine}>Combine A+V</button>
            </div> */}
          </TabPanel>

          {/* instagram panel */}
          <TabPanel>
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
          </TabPanel>

          {/* Meme gen form */}
          <TabPanel>
            <form className="meme-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="topText"
                placeholder="Top Text"
                value={this.state.topText}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="bottomText"
                placeholder="Bottom Text"
                value={this.state.bottomText}
                onChange={this.handleChange}
              />

              <button>Gen</button>
            </form>
          </TabPanel>
        </Tabs>

        <div className="meme">
          {/* <img src={this.state.randomImg} alt="" /> */}
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MediaFetcher;
