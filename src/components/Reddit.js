import React, { Component } from 'react';

import 'react-tabs/style/react-tabs.css';

class Reddit extends Component {
  constructor() {
    super();
    this.state = {
      redditVideo: 'reddit video placeholder',
      redditAudio: 'reddit audio placeholder',
      redditURLinput: '',
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

  render() {
    return (
      <>
        {/* TODO: https://reactcommunity.org/react-tabs/ style and color the tabs, generate them. only 3 so maybe no necessary to generate but at least style them 
    and give them icons don't use trademarked icons */}

        <p>Example reddit url: https://www.reddit.com/r/oddlysatisfying/comments/an4bc2/this_axe_getting_restored/</p>
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
          <h2>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                'https://angry-hugle-804067.netlify.com/demo/?video=' +
                this.state.redditVideo +
                '&audio=' +
                this.state.redditAudio
              }
            >
              Download A+V
            </a>
          </h2>
          {/* <button onClick={this.handleRedditCombine}>Combine A+V</button> */}
        </div>
      </>
    );
  }
}

export default Reddit;

// import React from 'react';

// function Reddit() {
//   return (
//     <div>
//       <p>Example reddit url: https://www.reddit.com/r/oddlysatisfying/comments/an4bc2/this_axe_getting_restored/</p>
//       <form id="redditForm" className="meme-form" onSubmit={this.handleReddit}>
//         <input type="text" name="redditURLinput" placeholder="Reddit Video URL" onChange={this.handleChange} />
//         <button>Reddit</button>
//       </form>
//       <div>
//         <h2 className="top">
//           <a target="_blank" rel="noopener noreferrer" href={this.state.redditVideo}>
//             Video Link
//           </a>
//         </h2>
//         <h2 className="bottom">
//           <a target="_blank" rel="noopener noreferrer" href={this.state.redditAudio}>
//             Audio Link
//           </a>
//         </h2>
//       </div>
//     </div>
//   );
// }

// export default Reddit;
