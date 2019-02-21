import React from "react";

function Header() {
  return (
    <header>
      <p>
        Social
        <span style={{ color: "#e43725" }}>Snapper </span>
        {/* <img src="./redsnapper.png" alt="icon" /> */}
      </p>
      <button class="snapper-button">Donate</button>
    </header>
  );
}

export default Header;
