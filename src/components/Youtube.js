import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import Popup from 'react-popup';

import Loading from './Loading';
import VideoTable from './Youtube/VideoTable';
import AudioTable from './Youtube/AudioTable';
import BothTable from './Youtube/BothTable';
import FadeIn from 'react-fade-in/lib/FadeIn';
import SadMessage from './SadMessage';

class Youtube extends Component {
  constructor() {
    super();
    this.state = {
      youtubeData: {}, // holds object obtained from flask server api. holds all links/formats/info
      youtubeReady: false, // when ready the results are displayed
      youtubeWarning: false, // shows message stating 'Playlists are not supported' when user searches playlists
      youtubeError: false, // shows error message for invalid searches
      youtubeLoading: false, // shows loading animation
      youtubeDemo: true, // shows 'Try it out' button
      youtubeURLinput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleYoutube = this.handleYoutube.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(event) {
    event.preventDefault();
    this.setState({ youtubeDemo: true });
    this.setState({ youtubeReady: false });
    this.setState({ youtubeWarning: false });
    this.setState({ youtubeError: false });
    document.getElementById('youtubeURLinput').value = '';
    this.setState({ youtubeURLinput: '' });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleDemo(event) {
    event.preventDefault(); //prevent from reloading the page on submit

    this.setState({ youtubeError: false });
    this.setState({ youtubeDemo: false });
    this.setState({ youtubeData: '' });
    this.setState({ youtubeWarning: false });
    this.setState({ youtubeLoading: true });
    this.setState({ youtubeReady: false });

    const demo = {
      youtube: {
        audio: [
          {
            abr: '128kbps',
            audio_codec: 'mp4a.40.2',
            filesize: '3.98 MB',
            itag: '140',
            mime_type: 'audio/mp4',
            url:
              'https://r2---sn-vgqskn7z.googlevideo.com/videoplayback?dur=262.408&source=youtube&id=o-AEnSuAjXsKfzZjwr_Yljvhbwy-uMrReAA1vneEwpkt70&requiressl=yes&itag=140&lmt=1540372879379467&keepalive=yes&ip=54.198.61.139&clen=4168392&signature=BF654E8E9C44A7FDBF207EF97394C2F0EE9E5ED7.BD0C2D495BE2239CCA4DFFB3ECFCF3344005131E&ms=au,rdu&ei=9tJuXJKpD4iNgwOF87KIDQ&mv=m&pl=16&mt=1550766716&mn=sn-vgqskn7z,sn-vgqs7nlk&mm=31,29&key=yt6&c=WEB&gir=yes&expire=1550788438&fvip=2&ipbits=0&initcwndbps=3222500&txp=5533432&sparams=clen,dur,ei,gir,id,initcwndbps,ip,ipbits,itag,keepalive,lmt,mime,mm,mn,ms,mv,pl,requiressl,source,expire&mime=audio/mp4',
          },
        ],
        video: [
          {
            filesize: '30.16 MB',
            fps: 30,
            itag: '136',
            mime_type: 'video/mp4',
            resolution: '720p',
            url:
              'https://r2---sn-vgqskn7z.googlevideo.com/videoplayback?dur=262.345&source=youtube&id=o-AEnSuAjXsKfzZjwr_Yljvhbwy-uMrReAA1vneEwpkt70&requiressl=yes&itag=136&lmt=1540373408403490&keepalive=yes&ip=54.198.61.139&clen=31623016&signature=6AB14853B6F6EF5E810BDB6910BA1A11921AB2D3.2AAA1DB0E647F2A0D32F8CC9FD1C610ED5B63104&ms=au,rdu&ei=9tJuXJKpD4iNgwOF87KIDQ&mv=m&pl=16&mt=1550766716&mn=sn-vgqskn7z,sn-vgqs7nlk&mm=31,29&key=yt6&c=WEB&gir=yes&expire=1550788438&fvip=2&ipbits=0&initcwndbps=3222500&aitags=133,134,135,136,160,242,243,244,247,278&txp=5533432&sparams=aitags,clen,dur,ei,gir,id,initcwndbps,ip,ipbits,itag,keepalive,lmt,mime,mm,mn,ms,mv,pl,requiressl,source,expire&mime=video/mp4',
            video_codec: 'avc1.4d401f',
          },
        ],
        both: [
          {
            audio_codec: 'mp4a.40.2',
            filesize: '34.12 MB',
            fps: 30,
            itag: '22',
            mime_type: 'video/mp4',
            resolution: '720p',
            url:
              'https://r2---sn-vgqskn7z.googlevideo.com/videoplayback?dur=262.408&ratebypass=yes&source=youtube&mime=video/mp4&id=o-AEnSuAjXsKfzZjwr_Yljvhbwy-uMrReAA1vneEwpkt70&initcwndbps=3222500&requiressl=yes&c=WEB&itag=22&lmt=1540373641333355&ip=54.198.61.139&expire=1550788438&fvip=2&signature=361E386C3B00D234DEA06F683B8E72F8D60626C8.338EE0E5DDD84B6737F79ECB7A69AAE8E6C871&ms=au,rdu&ipbits=0&ei=9tJuXJKpD4iNgwOF87KIDQ&mv=m&pl=16&mt=1550766716&mn=sn-vgqskn7z,sn-vgqs7nlk&txp=5531432&mm=31,29&sparams=dur,ei,id,initcwndbps,ip,ipbits,itag,lmt,mime,mm,mn,ms,mv,pl,ratebypass,requiressl,source,expire&key=yt6',
            video_codec: 'avc1.64001F',
          },
        ],
      },
    };

    this.setState({ youtubeData: demo });
    this.setState({ youtubeReady: true });
    this.setState({ youtubeLoading: false });
    this.setState({
      youtubeURLinput: 'https://www.youtube.com/watch?v=a3lcGnMhvsA',
    });
  }

  handleYoutube(event) {
    event.preventDefault(); //prevent from reloading the page on submit
    if (this.state.youtubeURLinput && !this.state.youtubeLoading) {
      this.setState({ youtubeError: false });
      this.setState({ youtubeDemo: false });
      if (this.state.youtubeURLinput.includes('playlist')) {
        this.setState({ youtubeWarning: true });
        this.setState({ youtubeData: '' });
        this.setState({ youtubeReady: false });
      } else {
        this.setState({ youtubeData: '' });
        this.setState({ youtubeWarning: false });
        this.setState({ youtubeLoading: true });
        this.setState({ youtubeReady: false });
        let url = 'https://snapperapi.herokuapp.com/youtubeAPI';
        let youtubeVideoURL = this.state.youtubeURLinput;

        // Build formData object.
        let formData = new FormData();
        formData.append('youtubeURL', youtubeVideoURL);

        const that = this;

        fetch(url, {
          method: 'POST',
          body: formData,
        })
          .then(function(response) {
            if (response.status !== 200) {
              that.setState({ youtubeError: true });
              that.setState({ youtubeData: '' });
              that.setState({ youtubeLoading: false });
              return false;
            } else {
              return response.json();
            }
          })
          .then(function(jsonData) {
            if (jsonData !== false) {
              that.setState({ youtubeData: jsonData });
              that.setState({ youtubeReady: true });
              that.setState({ youtubeLoading: false });
            }
          })
          .catch((error) => console.error('Error:', error));
      }
    } else if (!this.state.youtubeLoading) {
      Popup.alert('Please enter a URL.');
    }
  }
  render() {
    const displayYoutubeResults = this.state.youtubeReady;
    const youtubeWarningMessage = (
      <p className="error-message">
        <button className="reset-button" onClick={this.handleReset}>
          <i className="fas fa-times" />
        </button>
        Playlists are not currently supported.
      </p>
    );

    const youtubeErrorMessage = (
      <p className="error-message">
        {/* There was an error with your request. Try again or use a different
        video. Could be related to an issue with{" "}
        <a href="https://github.com/nficano/pytube">Pytube</a>. Waiting for a
        fix. */}
        <button className="reset-button" onClick={this.handleReset}>
          <i className="fas fa-times" />
        </button>
        Error with your search. Try again or use a different video. <br />
        Your URL should look like this:{' '}
        <a
          href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
          className="snapper-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.youtube.com/watch?v=a3lcGnMhvsA
        </a>
      </p>
    );

    const displayYoutubeLoading = this.state.youtubeLoading;

    let youtubeWarning = this.state.youtubeWarning;

    const youtubeData = this.state.youtubeData['youtube'];
    let youtubeHeader;

    // let youtubeHighest;

    let audioRows;
    let videoRows;
    let bothRows;

    if (youtubeData !== undefined) {
      console.log(youtubeData);
      const audioData = youtubeData['audio'];
      const bothData = youtubeData['both'];
      const videoData = youtubeData['video'];
      // const generalData = youtubeData['general'];

      const generalData = {
        thumbnail: 'http://i3.ytimg.com/vi/a3lcGnMhvsA/maxresdefault.jpg',
        url: 'https://www.youtube.com/watch?v=a3lcGnMhvsA',
        title: 'Interstellar - Docking Scene 1080p IMAX HD',
      };

      youtubeHeader = (
        <div className="youtube-header">
          <h3>
            <a
              href={generalData['url']}
              target="_blank"
              rel="noopener noreferrer"
            >
              {generalData['title']}
            </a>
          </h3>
          <a
            href={generalData['url']}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="youtube thumbnail"
              className="youtube-thumbnail"
              src={generalData['thumbnail']}
            />
          </a>
        </div>
      );

      bothRows = bothData.map((data, i) => (
        <tr key={i}>
          <td>
            {data.resolution} {data.fps}fps
          </td>
          <td>{data.mime_type.replace('video/', '')}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>

          <td>
            {' '}
            <a
              className="snapper-button youtube-button"
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
            >
              Download
            </a>
          </td>
        </tr>
      ));

      audioRows = audioData.map((data, i) => (
        <tr key={i}>
          <td>{data.abr}</td>
          <td>{data.audio_codec}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a
              className="snapper-button youtube-button"
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
            >
              Download
            </a>
          </td>
        </tr>
      ));

      videoRows = videoData.map((data, i) => (
        <tr key={i}>
          <td>
            {data.resolution || 'Unknown'} {data.fps}fps
          </td>
          <td>{data.mime_type.replace('video/', '')}</td>
          <td>{data.filesize}</td>
          <td>
            {' '}
            <a
              className="snapper-button youtube-button"
              target="_blank"
              rel="noopener noreferrer"
              href={data.url}
            >
              Download
            </a>
          </td>
        </tr>
      ));
    }

    let youtubeDemo = (
      <div>
        {/* <p className="url-tip">
          Message from the developer: Thank you for using SocialSnapper. YouTube
          has recently updated their website and made life difficult for people
          like me to help you view their videos.
        </p>
        <p className="url-tip">
          I am working on a fix. In the meantime please use an alternative
          website for YouTube videos. Everything else should work fine.
        </p> */}
        {/* <p className="url-tip">
          Your URL should look like this:{' '}
          <a
            href="https://www.youtube.com/watch?v=a3lcGnMhvsA"
            className="snapper-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.youtube.com/watch?v=a3lcGnMhvsA
          </a>
        </p> */}
        <p className="url-tip">
          Here you can download Youtube videos in all available formats.
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
        <form className="snapper-form" onSubmit={this.handleYoutube}>
          <div className="input-group snapper-form-div">
            <Popup />
            {/* <input
              className="snapper-input"
              type="text"
              name="youtubeURLinput"
              id="youtubeURLinput"
              placeholder="Youtube Video URL"
              onChange={this.handleChange}
              value={this.state.youtubeURLinput}
            />
            <button className="snapper-button search-button">
              <i className="fas fa-search" />
            </button> */}
            <SadMessage url="https://youtube.com" />
          </div>

          <div>{this.state.youtubeDemo ? youtubeDemo : ''}</div>
        </form>

        <div className="youtube-outer-shell" style={{ margin: 'auto' }}>
          <div className="youtube-download-container" style={{ width: '100%' }}>
            {youtubeWarning ? <FadeIn>{youtubeWarningMessage}</FadeIn> : ''}
            {displayYoutubeLoading ? <Loading /> : ''}

            {this.state.youtubeError ? (
              <FadeIn>{youtubeErrorMessage}</FadeIn>
            ) : (
              ''
            )}

            {displayYoutubeResults ? (
              <FadeIn>
                <button className="reset-button" onClick={this.handleReset}>
                  <i className="fas fa-times" />
                </button>
                <div style={{ paddingTop: '30px' }}>{youtubeHeader}</div>

                <BothTable bothRows={bothRows} />
                <AudioTable audioRows={audioRows} />
                <VideoTable videoRows={videoRows} />
              </FadeIn>
            ) : (
              ''
            )}
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default Youtube;
