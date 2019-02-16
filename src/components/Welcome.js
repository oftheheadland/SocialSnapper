import React from 'react';

function Welcome() {
  return (
    <div style={{ padding: '30px', paddingTop: '100px', textAlign: 'center' }}>
      <p>
        Social media websites don't make it easy to download and save their content. This website allows you to view and
        save media from some of the most popular platforms.
      </p>
      <p>
        Select the tab relevant to your interests and enter the URL (link) of a post to download the contents. An
        example URL is provided in each tab.
      </p>
      <p>
        <strong>Reddit</strong> - Used for downloading video posts - specifically v.reddit posts, which are normally not
        available for download.
      </p>

      <p>
        <strong>Instagram</strong> - Any Instagram post will work - including albums and videos.
      </p>

      <p>
        <strong>Youtube</strong> - Download any Youtube video in a multitude of formats.
      </p>
    </div>
  );
}

export default Welcome;
