import React, { Component } from "react";
import CookieConsent from "react-cookie-consent";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import "./style.css";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
        <CookieConsent
          location="bottom"
          buttonText="I understand"
          debug={true}
          style={{ background: "rgb(41, 37, 37)", textAlign: "center" }}
          buttonStyle={{ color: "black", fontSize: "15px" }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
      </div>
    );
  }
}

export default App;
