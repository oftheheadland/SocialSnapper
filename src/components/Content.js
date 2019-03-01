import React from "react";
import FadeIn from "react-fade-in";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
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

// const NotFound = () => <div className="outer-container">Not found</div>;

const NotFoundRedirect = () => <Redirect to="/" />;

function Content() {
  return (
    <div>
      <Router>
        <div>
          <div id="nav-links" style={{ margin: "auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "10px" }}>
              <Link className="router-link" to="/">
                Home
              </Link>
            </div>

            <div style={{ display: "inline-block", padding: "10px" }}>
              <Link className="router-link" to="/about">
                About
              </Link>
            </div>

            <div style={{ display: "inline-block", padding: "10px" }}>
              <Link className="router-link" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          {/* <Route path="/404" component={NotFound} /> */}
          <Route component={NotFoundRedirect} />
        </div>
      </Router>
    </div>
  );
}

export default Content;
