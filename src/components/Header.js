import React from "react";
import FadeIn from "react-fade-in";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MediaFetcher from "./MediaFetcher";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

function Home() {
  return (
    <FadeIn>
      <MediaFetcher />
    </FadeIn>
  );
}

function About() {
  return <AboutPage />;
}

function Contact() {
  return <ContactPage />;
}

function Header() {
  return (
    <div>
      <header>
        <p>
          Social
          <span style={{ color: "#e43725" }}>Snapper</span>
        </p>
      </header>

      <Router>
        <div>
          <div id="nav-links" style={{ margin: "auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "10px" }}>
              <Link to="/">Home</Link>
            </div>

            <div style={{ display: "inline-block", padding: "10px" }}>
              <Link to="/about">About</Link>
            </div>

            <div style={{ display: "inline-block", padding: "10px" }}>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </div>
      </Router>
    </div>
  );
}

export default Header;
