import React, { Component } from "react";
import FadeIn from "react-fade-in";
import MediaFetcher from "./MediaFetcher";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: "home"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ currentPage: event.target.name });
  }

  render() {
    return (
      <div>
        <div>
          <div className="nav-links">
            <div className="router-div">
              <a
                href="/"
                name="home"
                className="router-link"
                onClick={this.handleChange}
              >
                Home
              </a>
            </div>

            <div className="router-div">
              <a
                href="/"
                name="about"
                className="router-link"
                onClick={this.handleChange}
              >
                About
              </a>
            </div>

            <div className="router-div">
              <a
                href="/"
                name="contact"
                className="router-link"
                onClick={this.handleChange}
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {this.state.currentPage === "home" ? (
          <FadeIn>
            <MediaFetcher />
          </FadeIn>
        ) : (
          ""
        )}
        {this.state.currentPage === "about" ? <AboutPage /> : ""}
        {this.state.currentPage === "contact" ? <ContactPage /> : ""}
      </div>
    );
  }
}
export default Content;
