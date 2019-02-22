import React, { Component } from "react";
import Header from "./components/Header";
import MediaFetcher from "./components/MediaFetcher";

import Footer from "./components/Footer";
import "./style.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MediaFetcher />
        <Footer />
      </div>
    );
  }
}

export default App;
