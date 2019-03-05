import React, { Component } from "react";
import FadeIn from "react-fade-in";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import MediaFetcher from "./MediaFetcher";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

class Content extends Component {
  constructor() {
    super();
    this.state = {};
    this.Home = this.Home.bind(this);
    this.About = this.About.bind(this);
    this.Contact = this.Contact.bind(this);
  }

  Home() {
    return (
      <FadeIn>
        <MediaFetcher />
      </FadeIn>
    );
  }

  About() {
    return <AboutPage />;
  }

  Contact() {
    return <ContactPage />;
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <div id="nav-links" style={{ margin: "auto", textAlign: "center" }}>
              <div className="router-div">
                <Link className="router-link" to="/">
                  Home
                </Link>
              </div>

              <div className="router-div">
                <Link className="router-link" to="/about">
                  About
                </Link>
              </div>

              <div className="router-div">
                <Link className="router-link" to="/contact">
                  Contact
                </Link>
              </div>
            </div>

            <Route exact path="/" component={this.Home} />
            <Route path="/about" component={this.About} />
            <Route path="/contact" component={this.Contact} />
            {/* <Route path="/404" component={NotFound} /> */}
            {/* <Route component={NotFoundRedirect} /> */}
          </div>
        </Router>
      </div>
    );
  }
}
export default Content;

// function Home() {
//   return (
//     <FadeIn>
//       <MediaFetcher />
//     </FadeIn>
//   );
// }

// function About() {
//   return <AboutPage />;
// }

// function Contact() {
//   return <ContactPage />;
// }

// // const NotFound = () => <div className="outer-container">Not found</div>;

// // const NotFoundRedirect = () => <Redirect to="/404" />;

// function Content() {
//   return (
//     <div>
//       <Router>
//         <div>
//           <div id="nav-links" style={{ margin: "auto", textAlign: "center" }}>
//             <div style={{ display: "inline-block", padding: "10px" }}>
//               <Link className="router-link" to="/">
//                 Home
//               </Link>
//             </div>

//             <div style={{ display: "inline-block", padding: "10px" }}>
//               <Link className="router-link" to="/about">
//                 About
//               </Link>
//             </div>

//             <div style={{ display: "inline-block", padding: "10px" }}>
//               <Link className="router-link" to="/contact">
//                 Contact
//               </Link>
//             </div>
//           </div>

//           <Route exact path="/" component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} />
//           {/* <Route path="/404" component={NotFound} /> */}
//           {/* <Route component={NotFoundRedirect} /> */}
//         </div>
//       </Router>
//     </div>
//   );
// }

// export default Content;
