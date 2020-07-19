import React from 'react';

function SadMessage(props) {
  return (
    <>
      <div>
        Due to API changes at{' '}
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          {props.url}
        </a>{' '}
        this section of the website is no longer working.
      </div>

      <div>
        Please try out the "View Example" button below to see how this feature
        performed.
      </div>
    </>
  );
}

export default SadMessage;
