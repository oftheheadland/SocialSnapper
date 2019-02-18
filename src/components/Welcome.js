import React from 'react';

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-div">
        <p>
          Social media websites don't make it easy to download and save their content. This website allows you to view
          and save media from some of the most popular platforms.
        </p>
        <p>
          Select a tab and enter the URL of a post to download the contents. An
          example URL is provided in each tab.
        </p>
      </div>
      <div className="welcome-div">
        <ul>
          <li>
            <strong>Reddit</strong> - Used for downloading video posts - specifically v.reddit posts, which are normally
            not available for download.
          </li>

          <li>
            <strong>Instagram</strong> - Any Instagram post will work - including albums and videos.
          </li>

          <li>
            <strong>Youtube</strong> - Download any Youtube video in a variety of formats.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Welcome;
