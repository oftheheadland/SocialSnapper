import React from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

function Loading() {
  return (
    <FadeIn>
      <div>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </FadeIn>
  );
}

export default Loading;
